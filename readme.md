This is an eCommerce application.

To run this code, you need to have Node.js and MySQL set up on your machine. 
Run npm install to download all the Node.js dependencies. 
Replace the database credentials in the db.js file. 
Run the init.sql file to load initial data into the database. 
Go to the user folder and run the command node user_routes.js. 
Go to the product folder and run the command node product_routes.js.

Both microservices will be up and running at ports 3000 and 3001, respectively.

Database: MySql

User Microservices:

API List in User Microservices:

1. Register

        name

        email

        password -> Should be strong and encrypted.

        gender

        age


2. Login:

        email

        password


Product Microservices:

1. Order by user id

        Store productId userId and quantity. The quantity should be removed from the stock table as per the user enters the quantity.

2. Check Stock by-product Id.

        Pass the productId and get the response of the particular product.

3. Get all orders by userId

        Fetch product details from the product table based on userId inserted into the order table.
