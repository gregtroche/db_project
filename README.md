# Additional Database Documentation

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

### Delete Accessory Group
```sql
CREATE OR REPLACE PROCEDURE delete_accessory_group(IN group_id_arg integer)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM accessory_group_product_data WHERE group_id = group_id_arg;
    DELETE FROM accessory_group_data WHERE id = group_id_arg;
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
### Delete Bundle
Deletes a bundle from teh join table and then from the bundle table
```sql
CREATE OR REPLACE PROCEDURE delete_bundle(IN bundle_id_arg integer)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM bundle_products_data WHERE bundle_id = bundle_id_arg;
    DELETE FROM bundle_data WHERE id = bundle_id_arg;
END;
$$;
```

### Delete Event
Deletes an event by cascading all the subsequent tables (`shipping, bundle_data, bundle_products_data, accessory_group_data, accessory_group_product_data`)
```sql
CREATE OR REPLACE PROCEDURE delete_event(IN event_id_arg integer)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM shipping WHERE event_id = event_id_arg;
    DELETE FROM accessory_group_product_data WHERE group_id IN (
        SELECT id FROM accessory_group_data WHERE event_id = event_id_arg
    );
    DELETE FROM accessory_group_data WHERE event_id = event_id_arg;
    DELETE FROM bundle_products_data WHERE bundle_id IN (
        SELECT id FROM bundle_data WHERE event_id = event_ID_arg
    );
    DELETE FROM bundle_data WHERE event_id = event_id_arg;
    DELETE FROM events where id = event_id_arg;
END;
$$;
```

### Delete School
Loops through events containing the school ID and calls the `delete_event` stored procedure, and finally deletes the school itself.

```sql
CREATE OR REPLACE PROCEDURE delete_school(IN school_id_arg integer)
LANGUAGE plpgsql
AS $$
DECLARE f record;
BEGIN
    FOR f IN SELECT id FROM events WHERE school_id = school_id_arg
    LOOP
        CALL delete_event(f.id);
    END LOOP;
    DELETE FROM schools WHERE id = school_id_arg;
END;
$$;
```
