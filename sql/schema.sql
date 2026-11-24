-- Handcrafted by Sneha — Supabase schema
-- Run this once in: Supabase dashboard -> SQL Editor -> New query -> paste all -> Run

-- 1. PRODUCTS TABLE ----------------------------------------------------
create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null check (category in ('earrings','keychains')),
  price       numeric not null check (price >= 0),
  description text default '',
  image_url   text,
  available   boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table products enable row level security;

-- Anyone (including anonymous shoppers) can read the catalog.
create policy "public can read products"
  on products for select
  using (true);

-- Only a logged-in admin (you, signed into Supabase Auth) can add/edit/delete.
create policy "admin can insert products"
  on products for insert
  to authenticated
  with check (true);

create policy "admin can update products"
  on products for update
  to authenticated
  using (true);

create policy "admin can delete products"
  on products for delete
  to authenticated
  using (true);


-- 2. ORDERS TABLE -------------------------------------------------------
create table if not exists orders (
  id              uuid primary key default gen_random_uuid(),
  order_code      text not null,
  items           jsonb not null,        -- [{id,name,qty,price}, ...]
  total           numeric not null,
  buyer_name      text not null,
  buyer_phone     text not null,
  buyer_address   text not null,
  pay_app         text not null,
  pay_holder_name text not null,
  utr_last4       text not null,
  status          text not null default 'Placed'
                  check (status in ('Placed','Shipped','Delivered','Refunded','Cancelled')),
  created_at      timestamptz not null default now()
);

alter table orders enable row level security;

-- Any shopper can place an order (insert), but cannot read orders back —
-- keeps buyers from seeing each other's details.
create policy "anyone can place an order"
  on orders for insert
  to anon, authenticated
  with check (true);

-- Only the logged-in admin can view and manage orders.
create policy "admin can read orders"
  on orders for select
  to authenticated
  using (true);

create policy "admin can update orders"
  on orders for update
  to authenticated
  using (true);

create policy "admin can delete orders"
  on orders for delete
  to authenticated
  using (true);


-- 3. PRODUCT IMAGE STORAGE -----------------------------------------------
-- Run once: Supabase dashboard -> Storage -> Create bucket -> name it
-- exactly "product-images" and tick "Public bucket". Then run the
-- policies below in the SQL editor (they attach to storage.objects).

create policy "public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "admin can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "admin can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "admin can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');


-- 4. SEED A FEW STARTER PRODUCTS (optional — edit or delete these rows
--    any time from the admin panel) -------------------------------------
insert into products (name, category, price, description, available) values
  ('Terracotta Drop Earrings', 'earrings', 249, 'Hand-rolled terracotta clay dangle earrings, lightweight.', true),
  ('Beaded Hoop Earrings', 'earrings', 299, 'Seed-bead wrapped hoops, nickel-free hooks.', true),
  ('Macrame Tassel Keychain', 'keychains', 149, 'Hand-knotted macrame with wooden bead and tassel.', true),
  ('Clay Charm Keychain', 'keychains', 129, 'Hand-painted clay charm on a brass ring.', true);
