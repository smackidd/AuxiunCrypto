Database Tables:

Users:  
-email  
-password (hashed)  
-first name  
-last name  
-account number (encrypted?) (allow null)  
-coin balance  (allow null)  
-avatar (picture)  (allow null)  

Devs:  
-email  
-password (hashed)  
-company name  
-auth key  

Assets Tokens:  
-token hash  
-owner  
-in Marketplace (allow null)  
-price  

Marketplace:  
-token id (foreign key to Asset Tokens)  
-price  
-list date  
