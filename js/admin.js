(function(){
  let currentSession = null;
  let selectedImageFile = null;

  function fmt(n){ return "₹" + Number(n).toLocaleString("en-IN"); }

  // ---------- auth ----------
  async function checkSession(){
    const { data } = await supabaseClient.auth.getSession();
    currentSession = data.session;
    renderAuthState();
  }

  function renderAuthState(){
    const loggedIn = !!currentSession;
    document.getElementById("loginWrap").style.display = loggedIn ? "none" : "block";
    document.getElementById("adminWrap").style.display = loggedIn ? "block" : "none";
    document.getElementById("logoutBtn").style.display = loggedIn ? "inline-block" : "none";
    if(loggedIn){
      loadProducts();
      loadOrders();
    }
  }

  document.getElementById("loginBtn").addEventListener("click", async ()=>{
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    document.getElementById("loginErr").classList.remove("show");
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if(error){
      document.getElementById("loginErr").classList.add("show");
      return;
    }
    currentSession = data.session;
    renderAuthState();
  });

  document.getElementById("logoutBtn").addEventListener("click", async ()=>{
    await supabaseClient.auth.signOut();
    currentSession = null;
    renderAuthState();
  });

  // ---------- tabs ----------
  document.querySelectorAll(".admin-tab").forEach(tab=>{
    tab.addEventListener("click", ()=>{
      document.querySelectorAll(".admin-tab").forEach(t=>t.classList.remove("active"));
      tab.classList.add("active");
      const name = tab.dataset.tab;
      document.getElementById("tab-products").style.display = name === "products" ? "block" : "none";
      document.getElementById("tab-orders").style.display = name === "orders" ? "block" : "none";
    });
  });

  // ---------- products ----------
  async function loadProducts(){
    const tbody = document.getElementById("productsTbody");
    const { data, error } = await supabaseClient.from("products").select("*").order("created_at", { ascending: true });
    if(error){
      tbody.innerHTML = "";
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 6; td.textContent = "Couldn't load products.";
      tr.appendChild(td); tbody.appendChild(tr);
      return;
    }
    tbody.innerHTML = "";
    (data || []).forEach(p=>{
      const tr = document.createElement("tr");

      const nameTd = document.createElement("td"); nameTd.textContent = p.name; tr.appendChild(nameTd);
      const catTd = document.createElement("td"); catTd.textContent = [p.category, p.collection, p.piece_type].filter(Boolean).join(" · "); tr.appendChild(catTd);
      const priceTd = document.createElement("td"); priceTd.textContent = fmt(p.price); tr.appendChild(priceTd);

      const statusTd = document.createElement("td");
      const pill = document.createElement("span");
      pill.className = "pill " + (p.available ? "available" : "unavailable");
      pill.textContent = p.available ? "Available" : "Sold out";
      statusTd.appendChild(pill);
      tr.appendChild(statusTd);

      const photoTd = document.createElement("td");
      if(p.image_url){
        const img = document.createElement("img");
        img.src = p.image_url;
        img.style.width = "40px"; img.style.height = "40px";
        img.style.objectFit = "cover"; img.style.borderRadius = "6px";
        photoTd.appendChild(img);
      } else {
        photoTd.textContent = "None";
      }
      tr.appendChild(photoTd);

      const actionsTd = document.createElement("td");
      const toggleBtn = document.createElement("button");
      toggleBtn.className = "small-btn";
      toggleBtn.textContent = p.available ? "Mark sold out" : "Mark available";
      toggleBtn.addEventListener("click", ()=>toggleAvailable(p));
      actionsTd.appendChild(toggleBtn);

      const editBtn = document.createElement("button");
      editBtn.className = "small-btn";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", ()=>startEdit(p));
      actionsTd.appendChild(editBtn);

      const delBtn = document.createElement("button");
      delBtn.className = "small-btn danger";
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", ()=>deleteProduct(p));
      actionsTd.appendChild(delBtn);

      tr.appendChild(actionsTd);
      tbody.appendChild(tr);
    });
  }

  async function toggleAvailable(p){
    await supabaseClient.from("products").update({ available: !p.available }).eq("id", p.id);
    loadProducts();
  }

  async function deleteProduct(p){
    if(!confirm('Delete "' + p.name + '"? This cannot be undone.')) return;
    await supabaseClient.from("products").delete().eq("id", p.id);
    loadProducts();
  }

  function startEdit(p){
    document.getElementById("productFormTitle").textContent = "Edit product";
    document.getElementById("editingProductId").value = p.id;
    document.getElementById("pName").value = p.name;
    document.getElementById("pCategory").value = p.category;
    document.getElementById("pCollection").value = p.collection || "";
    document.getElementById("pType").value = p.piece_type || "";
    document.getElementById("pPrice").value = p.price;
    document.getElementById("pAvailable").value = String(p.available);
    document.getElementById("pDescription").value = p.description || "";
    document.getElementById("cancelEditBtn").style.display = "inline-block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.getElementById("cancelEditBtn").addEventListener("click", resetProductForm);

  function resetProductForm(){
    document.getElementById("productFormTitle").textContent = "Add a product";
    document.getElementById("editingProductId").value = "";
    document.getElementById("pName").value = "";
    document.getElementById("pCategory").value = "earrings";
    document.getElementById("pCollection").value = "";
    document.getElementById("pType").value = "";
    document.getElementById("pPrice").value = "";
    document.getElementById("pAvailable").value = "true";
    document.getElementById("pDescription").value = "";
    document.getElementById("pImageFile").value = "";
    document.getElementById("pImagePreviewWrap").innerHTML = "";
    selectedImageFile = null;
    document.getElementById("cancelEditBtn").style.display = "none";
  }

  document.getElementById("pImageFile").addEventListener("change", (e)=>{
    selectedImageFile = e.target.files[0] || null;
    const wrap = document.getElementById("pImagePreviewWrap");
    wrap.innerHTML = "";
    if(selectedImageFile){
      const img = document.createElement("img");
      img.style.width = "70px"; img.style.height = "70px";
      img.style.objectFit = "cover"; img.style.borderRadius = "8px";
      img.src = URL.createObjectURL(selectedImageFile);
      wrap.appendChild(img);
    }
  });

  async function uploadImageIfAny(){
    if(!selectedImageFile) return null;
    const ext = selectedImageFile.name.split(".").pop();
    const path = "p-" + Date.now() + "-" + Math.random().toString(36).slice(2,8) + "." + ext;
    const { error } = await supabaseClient.storage.from("product-images").upload(path, selectedImageFile, { upsert: false });
    if(error){ throw error; }
    const { data } = supabaseClient.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  }

  document.getElementById("saveProductBtn").addEventListener("click", async ()=>{
    const errBox = document.getElementById("productFormErr");
    errBox.classList.remove("show");

    const id = document.getElementById("editingProductId").value;
    const name = document.getElementById("pName").value.trim();
    const category = document.getElementById("pCategory").value;
    const collection = document.getElementById("pCollection").value || null;
    const piece_type = document.getElementById("pType").value || null;
    const price = parseFloat(document.getElementById("pPrice").value);
    const available = document.getElementById("pAvailable").value === "true";
    const description = document.getElementById("pDescription").value.trim();

    if(!name || isNaN(price) || price < 0){
      errBox.textContent = "Please fill in a name and a valid price.";
      errBox.classList.add("show");
      return;
    }

    const btn = document.getElementById("saveProductBtn");
    btn.disabled = true; btn.textContent = "Saving…";

    try{
      let imageUrl = undefined;
      if(selectedImageFile){
        imageUrl = await uploadImageIfAny();
      }
      const payload = { name, category, collection, piece_type, price, available, description };
      if(imageUrl) payload.image_url = imageUrl;

      if(id){
        const { error } = await supabaseClient.from("products").update(payload).eq("id", id);
        if(error) throw error;
      } else {
        const { error } = await supabaseClient.from("products").insert(payload);
        if(error) throw error;
      }
      resetProductForm();
      loadProducts();
    }catch(e){
      console.error(e);
      errBox.textContent = "Couldn't save this product: " + (e.message || "unknown error");
      errBox.classList.add("show");
    }finally{
      btn.disabled = false; btn.textContent = "Save product";
    }
  });

  // ---------- orders ----------
  async function loadOrders(){
    const tbody = document.getElementById("ordersTbody");
    const { data, error } = await supabaseClient.from("orders").select("*").order("created_at", { ascending: false });
    if(error){
      tbody.innerHTML = "";
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 6; td.textContent = "Couldn't load orders.";
      tr.appendChild(td); tbody.appendChild(tr);
      return;
    }
    tbody.innerHTML = "";
    if(!data || data.length === 0){
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 6; td.textContent = "No orders yet.";
      tr.appendChild(td); tbody.appendChild(tr);
      return;
    }
    data.forEach(o=>{
      const tr = document.createElement("tr");

      const codeTd = document.createElement("td");
      codeTd.innerHTML = "";
      const codeStrong = document.createElement("div");
      codeStrong.style.fontWeight = "700";
      codeStrong.textContent = o.order_code;
      const dateDiv = document.createElement("div");
      dateDiv.style.fontSize = "0.75rem"; dateDiv.style.color = "var(--muted)";
      dateDiv.textContent = new Date(o.created_at).toLocaleString("en-IN");
      codeTd.appendChild(codeStrong); codeTd.appendChild(dateDiv);
      tr.appendChild(codeTd);

      const itemsTd = document.createElement("td");
      const itemsList = (o.items || []).map(it => it.name + " ×" + it.qty).join(", ");
      itemsTd.textContent = itemsList;
      tr.appendChild(itemsTd);

      const totalTd = document.createElement("td"); totalTd.textContent = fmt(o.total); tr.appendChild(totalTd);

      const buyerTd = document.createElement("td");
      buyerTd.innerHTML = "";
      const bName = document.createElement("div"); bName.textContent = o.buyer_name;
      const bPhone = document.createElement("div"); bPhone.style.fontSize="0.75rem"; bPhone.style.color="var(--muted)"; bPhone.textContent = o.buyer_phone;
      const bAddr = document.createElement("div"); bAddr.style.fontSize="0.72rem"; bAddr.style.color="var(--muted)"; bAddr.textContent = o.buyer_address;
      buyerTd.appendChild(bName); buyerTd.appendChild(bPhone); buyerTd.appendChild(bAddr);
      tr.appendChild(buyerTd);

      const payTd = document.createElement("td");
      payTd.innerHTML = "";
      const pApp = document.createElement("div"); pApp.textContent = o.pay_app;
      const pHolder = document.createElement("div"); pHolder.style.fontSize="0.75rem"; pHolder.style.color="var(--muted)"; pHolder.textContent = o.pay_holder_name;
      const pUtr = document.createElement("div"); pUtr.style.fontSize="0.75rem"; pUtr.style.color="var(--muted)"; pUtr.textContent = "UTR •" + o.utr_last4;
      payTd.appendChild(pApp); payTd.appendChild(pHolder); payTd.appendChild(pUtr);
      tr.appendChild(payTd);

      const statusTd = document.createElement("td");
      const sel = document.createElement("select");
      sel.className = "status-select";
      ["Placed","Shipped","Delivered","Refunded","Cancelled"].forEach(s=>{
        const opt = document.createElement("option");
        opt.value = s; opt.textContent = s;
        if(s === o.status) opt.selected = true;
        sel.appendChild(opt);
      });
      sel.addEventListener("change", async ()=>{
        await supabaseClient.from("orders").update({ status: sel.value }).eq("id", o.id);
      });
      statusTd.appendChild(sel);
      tr.appendChild(statusTd);

      tbody.appendChild(tr);
    });
  }

  checkSession();
})();
