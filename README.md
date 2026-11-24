# Hamsadhwani: handmade jewellery storefront (Handcrafted by Sneha)

A small storefront for handmade earrings and keychains: browse, add to
cart, check out with UPI, no customer accounts. Orders are marked
"Placed" the instant a buyer enters their payment app, UPI account
holder name and last 4 digits of the UTR, and a pre-filled WhatsApp
message with the full order goes straight to your number.

Frontend only needs a static host (GitHub Pages works). The backend is
Supabase: a free hosted Postgres database plus file storage for
product photos, no server to run yourself.

```
index.html       storefront (public)
admin.html       admin panel (you log in here)
css/style.css    shared styles
js/config.js     your Supabase project keys + UPI/WhatsApp details: EDIT THIS
js/supabase-client.js
js/samples.js    sample pieces + the SAMPLE_MODE switch (see "Sample mode")
js/scenes.js     the page artwork (palace hero, temple skyline, mirror, rabab), all vector
js/ui.js         page motion: reveals, petals, rotating announcement bar
js/store.js      storefront logic
js/admin.js      admin logic
sql/schema.sql   run once in Supabase to create tables, policies, starter products
```

## 1. Create a Supabase project

1. Go to supabase.com, sign up (free tier is enough), click **New project**.
2. Pick a name, a database password (save it somewhere), and a region close to India.
3. Wait ~2 minutes for it to finish provisioning.

## 2. Run the database schema

1. In your project, open **SQL Editor** → **New query**.
2. Paste the entire contents of `sql/schema.sql` and click **Run**.
   This creates the `products` and `orders` tables, their access rules
   (public can browse and place orders; only you can edit the catalog
   or read order details), and adds four sample products you can edit
   or delete later.

## 3. Create the photo storage bucket

1. Go to **Storage** in the left sidebar → **New bucket**.
2. Name it exactly `product-images` and toggle **Public bucket** on.
3. The storage access policies were already created by `schema.sql`
   (anyone can view images, only you can upload/replace/delete).

## 4. Create your admin login

1. Go to **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter an email and password for yourself. This is what you'll use
   to log into `admin.html`, it's separate from your personal email
   login anywhere else. Add a second one the same way if you want a
   backup admin account.

## 5. Get your project's API keys

1. Go to **Project Settings** → **API**.
2. Copy the **Project URL** and the **anon public** key (not the
   service_role key, never put that one in a public website).

## 6. Fill in `js/config.js`

Open `js/config.js` and replace:

```js
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-PUBLIC-KEY";
const UPI_ID = "your-upi-id@bank";
const UPI_NAME = "Sneha Chakrabarti";
const WHATSAPP_NUMBER = "919362821348";
```

with your real Supabase URL/key, your real UPI ID, and the WhatsApp
number orders should land on. The anon key is meant to be public, it
only grants what the policies in `schema.sql` allow (shoppers can read
the catalog and place orders; only logged-in admins can edit products
or read order details).

## 7. Push to GitHub and turn on Pages

1. Create a new **public** repository on GitHub (Pages needs public,
   unless you're on a paid plan).
2. Upload all the files in this folder, keeping the same structure
   (`css/`, `js/`, `sql/` as subfolders).
3. Go to the repo's **Settings** → **Pages**.
4. Under **Source**, choose **Deploy from a branch**, branch `main`,
   folder `/ (root)`. Save.
5. After a minute, GitHub shows your live URL, something like
   `https://<your-username>.github.io/<repo-name>/`.

Your storefront is at that URL, and your admin panel is at
`.../admin.html`.

## Day-to-day use

- **Add or edit a piece**: go to `admin.html`, log in, use the form at
  the top of the Products tab. Uploading a photo there stores it in
  Supabase and shows it on the storefront automatically.
- **Mark something sold out**: click "Mark sold out" next to it in the
  admin table, it immediately stops being addable to cart on the
  storefront.
- **See orders**: the Orders tab lists every order with the buyer's
  details and payment confirmation, newest first. The WhatsApp message
  the buyer sends you is the fastest way to see a new order land, but
  this table is the full record. Update the status dropdown (Placed →
  Shipped → Delivered, or Refunded/Cancelled) as you fulfil each one.
- **Refund policy**: if a handmade piece can't be delivered, refund the
  buyer via your UPI app directly (there's no automatic refund flow -
  UPI itself has none), then mark the order "Refunded" here.

## Costs

Supabase's free tier covers this comfortably for a small shop (500MB
database, 1GB file storage, 50,000 monthly active users). GitHub Pages
is free for public repos. You will not need to pay anything to run
this as described.


## Sample mode (placeholder pieces)

`js/samples.js` starts with `const SAMPLE_MODE = true;`. While it is
true the storefront shows ten placeholder pieces with plain empty
photo rectangles, and checkout will not record any order (it shows a
preview-mode message instead). When you have added your real products
in the admin panel, change it to `const SAMPLE_MODE = false;` and the
site reads from Supabase again.

## Policy wording used on the site

- Each piece is handmade, so it may differ slightly from any photo.
- Delivery may be a little delayed.
- Full refund only if an order cannot be delivered.
- No returns or refunds once an order is delivered.

If you want to change the wording, search for "Each piece" and
"refund" in `index.html` and `js/store.js` (the WhatsApp message).
