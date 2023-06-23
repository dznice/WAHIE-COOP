# WAHIE-COOP

##Frontend Installations
**To serve the frontend run the following commands:**

```npm install
    npm install --force```

```npm i ng2-search-filter --legacy-peer-deps
npm i ngx-filter-pipe --legacy-peer-deps
npm i ngx-pagination --legacy-peer-deps
npm i ngx-strength-meter --legacy-peer-deps
npm i @ng-select/ng-select --legacy-peer-deps
npm i ng-angular-popup --legacy-peer-deps
npm i bn-ng-idle --legacy-peer-deps
npm i ngx-ui-loader --legacy-peer-deps
npm i exceljs --legacy-peer-deps
npm i html2pdf.js --legacy-peer-deps```


##Backend Installations
1. **To serve backend run the following commands:**

```composer install
npm update
npm run build
npm run dev
php artisan migrate```

2. **Composer Requirements:**
```composer require spatie/laravel-query-builder
composer require vonage/client```

**Seeder Requirements:**
*Replace in xammp/mysql
*Under msqld
```max_allowed_packet=64M
wait_timeout = 600```

3. **After php artisan migrate run this code:**
```composer dump-autoload```

3. **Then this code to seed the data from sql data:**

```php artisan db:seed --class=PhilippineRegionsTableSeeder
php artisan db:seed --class=PhilippineProvincesTableSeeder
php artisan db:seed --class=PhilippineCitiesTableSeeder
php artisan db:seed --class=PhilippineBarangaysTableSeeder```

4. **To add storage folder to backend:**

*Run the commmand:
```php artisan storage:link```

*Create image folder inside ng storage folder
*Copy coop-logo.png from FRONTEND assets/image folder
