DROP TABLE foods;

CREATE TABLE foods (
    id BIGSERIAL PRIMARY KEY,
    icon VARCHAR(128),
    name VARCHAR(255) NOT NULL,
    expiry DATE,
    quantity INT,
    unit VARCHAR(255),
    compartment VARCHAR(255),
    userId INT
);

INSERT INTO foods (name, quantity, unit, compartment, expiry, icon, userId)
VALUES ('egg', 1, 'carton', 'fridge', '10-31-1995', './dairy/eggs.svg', 0);

INSERT INTO foods (name, quantity, unit, compartment, expiry, icon, userId)
VALUES ('tomatoes', 2, 'jar', 'fridge', '10-30-1995', './vegetable/tomato.svg', 0);

SELECT CONVERT(VARCHAR(20),f.expiry,0) expiry FROM foods f;

SELECT
        name,
        quantity,
        unit,
        compartment,
        to_char(to_date(cast(expiry as TEXT), 'YYYY-MM-DD'), 'MM-DD-YYYY') AS expiry,
        icon,
        userId
FROM foods;