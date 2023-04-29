# Readme for DB Project

## Stored Procedures
### Delete Accessory Data
Deletes an accessory product from the join table before deleting it from the product table.
```sql
CREATE OR REPLACE PROCEDURE delete_accessory_data(IN product_id_arg integer)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM accessory_group_product_data WHERE product_id = product_id_arg;
    DELETE FROM accessory_products WHERE id = product_id_arg;
END;
$$;
```

### Delete Bundle Data
Deletes a bundle product from the join table before deleting it from the product table.
```sql
CREATE OR REPLACE PROCEDURE delete_bundle_data(IN product_id_arg integer)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM bundle_products_data WHERE bundle_product_id = product_id_arg;
    DELETE FROM bundle_products WHERE id = product_id_arg;
END;
$$;
```