# Additional Database Documentation

## ER Diagram
ER diagram can be found in the repository root directory under the name [er_diagram.png](er_diagram.png)

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
## Triggers
### Update Last Updated (Event)
Updates the last updated column on event update.
```sql
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_events_last_updated
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_last_updated_column();
```

### Update Last Updated (Shipping)
Updates the last updated column on shipping update.
```sql
CREATE OR REPLACE FUNCTION shipping_update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER shipping_update_events_last_updated
BEFORE UPDATE ON shipping
FOR EACH ROW
EXECUTE FUNCTION shipping_update_last_updated_column();
```

## Views
### Active Events
Displays all the school/event combos with events that are marked as active
```sql
CREATE VIEW active_events AS
SELECT s.name as school_name,
       e.name as event_name,
       e.ceremony_date as ceremony_date,
       e.website_open_date as website_open_date,
       e.website_close_date as website_close_date
FROM schools as s
INNER JOIN events e on s.id = e.school_id
WHERE e.active=true;
```

### Ship to school
Displays all the school/event combos with shipping profiles marked as ship to school
```sql
CREATE VIEW ship_to_school AS
SELECT s.name as school_name,
       e.name as event_name,
       sh.cost as cost,
       sh.address as address,
       sh. city as city,
       sh.state as state,
       sh.zip as zip
FROM schools as s
INNER JOIN events e on s.id = e.school_id
INNER JOIN shipping sh on sh.event_id = e.id
WHERE sh.ship_to_school = true;
```

## Function 
## Days Until
Takes a date argument and calculates the number of days from now until then. Used to calculate days until a ceremony. 
```sql
CREATE OR REPLACE FUNCTION days_until(input_date DATE)
RETURNS INTEGER AS $$
DECLARE
    result INTEGER;
BEGIN
    SELECT (DATE(input_date) - DATE(NOW())) INTO result;
    RETURN result;
END;
$$ LANGUAGE plpgsql;
```