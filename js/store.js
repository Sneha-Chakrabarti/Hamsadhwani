(function(){
  let PRODUCTS = [];
  let activeCat = "all";
  let cart = {}; // {productId: qty}

  // ---------- cart persistence (per-browser only) ----------
  function loadCart(){
    try{
      const raw = localStorage.getItem("hjs_cart");
      if(raw) cart = JSON.parse(raw);
    }catch(e){ cart = {}; }
  }
  function saveCart(){
    try{ localStorage.setItem("hjs_cart", JSON.stringify(cart)); }catch(e){}
  }

  function fmt(n){ return "₹" + Number(n).toLocaleString("en-IN"); }
  function productById(id){ return PRODUCTS.find(p=>p.id===id); }
  function cartCount(){ return Object.values(cart).reduce((a,b)=>a+b,0); }
  function cartTotal(){
    let total = 0;
    for(const id in cart){
      const p = productById(id);
      if(p) total += Number(p.price) * cart[id];
    }
    return total;
  }

  // ---------- load products from Supabase ----------
  const IS_SAMPLE = (typeof SAMPLE_MODE !== "undefined") && SAMPLE_MODE;
  async function loadProducts(){
    const grid = document.getElementById("grid");
    if(IS_SAMPLE){
      PRODUCTS = SAMPLE_PRODUCTS.slice();
      renderGrid();
      renderCartPanel();
      return;
    }
    try{
      const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });
      if(error) throw error;
      PRODUCTS = data || [];
      renderGrid();
      renderCartPanel();
    }catch(e){
      grid.innerHTML = "";
      const msg = document.createElement("div");
      msg.className = "empty-msg";
      msg.textContent = "Could not load the collection right now. Please refresh, or check back shortly.";
      grid.appendChild(msg);
      console.error(e);
    }
  }

  function renderGrid(){
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    const list = activeCat === "all" ? PRODUCTS : PRODUCTS.filter(p=>p.category===activeCat);
    if(list.length === 0){
      const empty = document.createElement("div");
      empty.className = "empty-msg";
      empty.textContent = "Nothing here yet. Check back soon.";
      grid.appendChild(empty);
      return;
    }
    list.forEach((p, i)=>{
      const card = document.createElement("div");
      card.className = "card reveal";
      card.style.setProperty("--i", String(i % 4));

      const thumb = document.createElement("div");
      thumb.className = "thumb";
      if(p.image_url){
        const img = document.createElement("img");
        img.src = p.image_url;
        img.alt = p.name;
        img.loading = "lazy";
        thumb.appendChild(img);
      }
      const idx = document.createElement("span");
      idx.className = "idx";
      idx.textContent = "No. " + String(i + 1).padStart(2, "0");
      thumb.appendChild(idx);
      if(IS_SAMPLE){
        const st = document.createElement("span");
        st.className = "sample-tag";
        st.textContent = "Sample";
        thumb.appendChild(st);
      }
      if(p.available){
        const bt = document.createElement("span");
        bt.className = "badge-tag";
        bt.textContent = "Made to order";
        thumb.appendChild(bt);
      } else {
        const ribbon = document.createElement("div");
        ribbon.className = "ribbon";
        ribbon.textContent = "Sold out";
        thumb.appendChild(ribbon);
      }
      card.appendChild(thumb);

      const body = document.createElement("div");
      body.className = "card-body";

      const tag = document.createElement("div");
      tag.className = "cat-tag";
      tag.textContent = p.category;
      body.appendChild(tag);

      const h3 = document.createElement("h3");
      h3.textContent = p.name;
      body.appendChild(h3);

      const desc = document.createElement("p");
      desc.className = "desc";
      desc.textContent = p.description || "";
      body.appendChild(desc);

      const priceRow = document.createElement("div");
      priceRow.className = "price-row";
      const price = document.createElement("span");
      price.className = "price";
      price.textContent = fmt(p.price);
      priceRow.appendChild(price);

      const btn = document.createElement("button");
      btn.className = "add-btn";
      btn.textContent = p.available ? "Add to cart" : "Unavailable";
      btn.disabled = !p.available;
      btn.addEventListener("click", ()=>{
        cart[p.id] = (cart[p.id]||0) + 1;
        saveCart();
        renderCartBadge();
        renderCartPanel();
        openCart();
      });
      priceRow.appendChild(btn);
      body.appendChild(priceRow);

      card.appendChild(body);
      grid.appendChild(card);
      if(window.UI) window.UI.observe(card); else card.classList.add("in");
    });
  }

  function renderCartBadge(){
    document.getElementById("cartBadge").textContent = cartCount();
  }

  function renderCartPanel(){
    const body = document.getElementById("cartBody");
    body.innerHTML = "";
    const ids = Object.keys(cart).filter(id=>cart[id] > 0 && productById(id) && productById(id).available);
    // drop stale/unavailable items from the visible cart silently
    // only prune once the catalogue has loaded, otherwise a page refresh would empty the cart
    if(PRODUCTS.length){
      Object.keys(cart).forEach(id=>{
        const p = productById(id);
        if(!p || !p.available){ delete cart[id]; }
      });
      saveCart();
      renderCartBadge();
    }

    if(ids.length === 0){
      const empty = document.createElement("div");
      empty.className = "empty-msg";
      empty.textContent = "Your cart is empty.";
      body.appendChild(empty);
    } else {
      ids.forEach(id=>{
        const p = productById(id);
        if(!p) return;
        const row = document.createElement("div");
        row.className = "cart-item";

        const thumb = document.createElement("div");
        thumb.className = "cart-thumb";
        if(p.image_url){
          const img = document.createElement("img");
          img.src = p.image_url; img.alt = "";
          thumb.appendChild(img);
        }
        row.appendChild(thumb);

        const info = document.createElement("div");
        info.className = "cart-info";
        const h4 = document.createElement("h4");
        h4.textContent = p.name;
        info.appendChild(h4);
        const priceLine = document.createElement("div");
        priceLine.className = "cart-meta";
        priceLine.textContent = fmt(p.price) + " each";
        info.appendChild(priceLine);

        const qtyRow = document.createElement("div");
        qtyRow.className = "qty-row";
        const minus = document.createElement("button");
        minus.className = "qty-btn"; minus.textContent = "−";
        minus.addEventListener("click", ()=>{
          cart[id] = Math.max(0, (cart[id]||0) - 1);
          if(cart[id] === 0) delete cart[id];
          saveCart(); renderCartBadge(); renderCartPanel();
        });
        const qtyNum = document.createElement("span");
        qtyNum.textContent = cart[id];
        qtyNum.style.minWidth = "18px";
        qtyNum.style.textAlign = "center";
        const plus = document.createElement("button");
        plus.className = "qty-btn"; plus.textContent = "+";
        plus.addEventListener("click", ()=>{
          cart[id] = (cart[id]||0) + 1;
          saveCart(); renderCartBadge(); renderCartPanel();
        });
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-link";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", ()=>{
          delete cart[id];
          saveCart(); renderCartBadge(); renderCartPanel();
        });
        qtyRow.appendChild(minus); qtyRow.appendChild(qtyNum); qtyRow.appendChild(plus); qtyRow.appendChild(removeBtn);
        info.appendChild(qtyRow);

        row.appendChild(info);
        body.appendChild(row);
      });
    }
    document.getElementById("cartSubtotal").textContent = fmt(cartTotal());
    document.getElementById("goCheckout").disabled = ids.length === 0;
  }

  // ---------- panels ----------
  function openCart(){
    document.getElementById("cartOverlay").classList.add("show");
    document.getElementById("cartPanel").classList.add("show");
  }
  function closeCart(){
    document.getElementById("cartOverlay").classList.remove("show");
    document.getElementById("cartPanel").classList.remove("show");
  }
  function openCheckout(){
    buildCheckoutView();
    document.getElementById("checkoutOverlay").classList.add("show");
    document.getElementById("checkoutPanel").classList.add("show");
  }
  function closeCheckout(){
    document.getElementById("checkoutOverlay").classList.remove("show");
    document.getElementById("checkoutPanel").classList.remove("show");
  }
  function openSuccess(){
    document.getElementById("successOverlay").classList.add("show");
    document.getElementById("successPanel").classList.add("show");
  }
  function closeSuccess(){
    document.getElementById("successOverlay").classList.remove("show");
    document.getElementById("successPanel").classList.remove("show");
  }

  let checkoutOrderNote = "";
  function buildCheckoutView(){
    const itemsWrap = document.getElementById("checkoutItems");
    itemsWrap.innerHTML = "";
    const ids = Object.keys(cart).filter(id=>cart[id] > 0);
    ids.forEach(id=>{
      const p = productById(id);
      if(!p) return;
      const line = document.createElement("div");
      line.className = "order-summary-line";
      const left = document.createElement("span");
      left.textContent = p.name + " × " + cart[id];
      const right = document.createElement("span");
      right.textContent = fmt(p.price * cart[id]);
      line.appendChild(left); line.appendChild(right);
      itemsWrap.appendChild(line);
    });
    const total = cartTotal();
    document.getElementById("checkoutTotal").textContent = fmt(total);
    document.getElementById("upiIdText").textContent = UPI_ID;

    const orderNote = "HJS-" + Date.now().toString(36).toUpperCase().slice(-6);
    checkoutOrderNote = orderNote;
    const upiUri = "upi://pay?pa=" + encodeURIComponent(UPI_ID) +
      "&pn=" + encodeURIComponent(UPI_NAME) +
      "&am=" + encodeURIComponent(total) +
      "&cu=INR&tn=" + encodeURIComponent(orderNote);

    document.getElementById("upiDeepLink").href = upiUri;

    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = "";
    if(window.QRCode){
      new QRCode(qrDiv, {
        text: upiUri, width: 170, height: 170,
        colorDark: "#2e2520", colorLight: "#ffffff"
      });
    }
  }

  function clearErrors(){
    document.querySelectorAll(".err, .form-err").forEach(e=>e.classList.remove("show"));
  }

  function validateCheckout(){
    clearErrors();
    let ok = true;
    const name = document.getElementById("buyerName").value.trim();
    const phone = document.getElementById("buyerPhone").value.trim();
    const address = document.getElementById("buyerAddress").value.trim();
    const holder = document.getElementById("payHolder").value.trim();
    const app = document.getElementById("payApp").value;
    const utr = document.getElementById("payUtr").value.trim();

    if(!name){ document.getElementById("errName").classList.add("show"); ok = false; }
    if(!/^[0-9]{10}$/.test(phone.replace(/\D/g,"").slice(-10))){ document.getElementById("errPhone").classList.add("show"); ok = false; }
    if(!address){ document.getElementById("errAddress").classList.add("show"); ok = false; }
    if(!holder){ document.getElementById("errHolder").classList.add("show"); ok = false; }
    if(!app){ document.getElementById("errApp").classList.add("show"); ok = false; }
    if(!/^[0-9]{4}$/.test(utr)){ document.getElementById("errUtr").classList.add("show"); ok = false; }

    return ok ? {name, phone, address, holder, app, utr} : null;
  }

  async function placeOrder(){
    const data = validateCheckout();
    if(!data) return;

    if(IS_SAMPLE){
      const se = document.getElementById("submitErr");
      se.textContent = "Preview mode: these are sample pieces, so no order was recorded.";
      se.classList.add("show");
      return;
    }

    const placeBtn = document.getElementById("placeOrderBtn");
    placeBtn.disabled = true;
    placeBtn.textContent = "Placing order…";

    const ids = Object.keys(cart).filter(id=>cart[id] > 0);
    const items = ids.map(id=>{
      const p = productById(id);
      return { id: p.id, name: p.name, qty: cart[id], price: Number(p.price) };
    });
    const total = cartTotal();
    const orderCode = checkoutOrderNote || ("HJS-" + Date.now().toString(36).toUpperCase().slice(-6));

    try{
      const { error } = await supabaseClient.from("orders").insert({
        order_code: orderCode,
        items: items,
        total: total,
        buyer_name: data.name,
        buyer_phone: data.phone,
        buyer_address: data.address,
        pay_app: data.app,
        pay_holder_name: data.holder,
        utr_last4: data.utr,
        status: "Placed"
      });
      if(error) throw error;
    }catch(e){
      console.error(e);
      document.getElementById("submitErr").classList.add("show");
      placeBtn.disabled = false;
      placeBtn.textContent = "I've paid: place order";
      return;
    }

    // Build the WhatsApp / summary message
    const lines = items.map(it => "- " + it.name + " × " + it.qty + " (" + fmt(it.price*it.qty) + ")");
    const messageLines = [
      "New order " + orderCode,
      "",
      ...lines,
      "Total: " + fmt(total),
      "",
      "Buyer: " + data.name,
      "Phone: " + data.phone,
      "Address: " + data.address,
      "",
      "Paid via: " + data.app,
      "UPI account holder: " + data.holder,
      "UTR last 4: " + data.utr,
      "",
      "(Handmade order: each piece may differ slightly, and delivery may be a little delayed. Full refund only if the order cannot be delivered. No returns or refunds once delivered.)"
    ];
    const message = messageLines.join("\n");

    const box = document.getElementById("orderSummaryBox");
    box.innerHTML = "";
    const pre = document.createElement("pre");
    pre.style.whiteSpace = "pre-wrap";
    pre.style.margin = "0";
    pre.style.fontFamily = "inherit";
    pre.textContent = message;
    box.appendChild(pre);

    document.getElementById("whatsappLink").href =
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);

    document.getElementById("copySummary").onclick = function(){
      const btn = this;
      const done = ()=>{ btn.textContent = "Copied!"; setTimeout(()=>btn.textContent="Copy order details", 1500); };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(message).then(done).catch(done);
      } else { done(); }
    };

    // reset form + cart
    cart = {};
    saveCart();
    renderCartBadge();
    renderCartPanel();
    placeBtn.disabled = false;
    placeBtn.textContent = "I've paid: place order";
    ["buyerName","buyerPhone","buyerAddress","payHolder","payApp","payUtr"].forEach(id=>{
      document.getElementById(id).value = "";
    });

    closeCheckout();
    openSuccess();
  }

  // ---------- wire up ----------
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("goCheckout").addEventListener("click", ()=>{ closeCart(); openCheckout(); });
  document.getElementById("closeCheckout").addEventListener("click", closeCheckout);
  document.getElementById("checkoutOverlay").addEventListener("click", closeCheckout);
  document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);
  document.getElementById("closeSuccess").addEventListener("click", closeSuccess);
  document.getElementById("successOverlay").addEventListener("click", closeSuccess);

  document.getElementById("tabs").addEventListener("click", (e)=>{
    const btn = e.target.closest(".tab");
    if(!btn) return;
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    btn.classList.add("active");
    activeCat = btn.dataset.cat;
    renderGrid();
  });

  document.getElementById("payUtr").addEventListener("input", function(){
    this.value = this.value.replace(/\D/g,"").slice(0,4);
  });

  loadCart();
  renderCartBadge();
  renderCartPanel();
  loadProducts();
})();
