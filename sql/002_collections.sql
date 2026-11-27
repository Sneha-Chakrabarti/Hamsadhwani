-- Collections and earring types.
-- Run once in: Supabase dashboard -> SQL Editor -> New query -> paste all -> Run
-- Run this BEFORE saving products from the updated admin page.

alter table products add column if not exists collection text;
alter table products add column if not exists piece_type text;

alter table products drop constraint if exists products_piece_type_check;
alter table products add constraint products_piece_type_check
  check (piece_type is null or piece_type in ('stud','jhumka','dangler','other'));

-- Collection ids used by the site: celeste, silk-road, flora
