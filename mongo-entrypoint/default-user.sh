#!/usr/bin/env bash
echo "Creating mongo users..."
mongo --authenticationDatabase admin --host localhost -u root -p 123456 omnistack --eval "db.createUser({user: 'omnistack', pwd: 'omnistack', roles: [{role: 'readWrite', db: 'omnistack'}]}); db.createUser({user: 'admin', pwd: '654321', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
echo "Mongo users created."