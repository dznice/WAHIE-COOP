# WAHIE-COOP

To serve the frontend run the following commands: 

npm install
    npm install --force

npm i ng2-search-filter --legacy-peer-deps
npm i ngx-filter-pipe --legacy-peer-deps
npm i ngx-pagination --legacy-peer-deps
npm i ngx-strength-meter --legacy-peer-deps
npm i @ng-select/ng-select --legacy-peer-deps
npm i ng-angular-popup --legacy-peer-deps
npm i bn-ng-idle --legacy-peer-deps


To serve backend run the following commands:

composer install
npm update
npm run build
npm run dev
npm install --save ngx-ui-loader --legacy-peer-deps
php artisan migrate
php artisan serve

composer require spatie/laravel-query-builder

eplace in xammp/mysql
under msqld
max_allowed_packet=64M
wait_timeout = 600