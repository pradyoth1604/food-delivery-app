# FoodApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.11.

## Overview

Foodie Delight is a sophisticated and user-friendly online food ordering system built with Angular. This project utilizes the real-time Swiggy API for fetching restaurant data and provides features such as user authentication, restaurant and customer dashboards, menu and order management, and the implementation of search, filter, and sort functionalities.

## Real-Time API Integration

The application uses the real-time Swiggy API to fetch restaurant data. The API is utilized in the RestaurantService located in src/app/restaurant.service.ts.

## Menu Items

The application includes some hardcoded menu items based on IDs obtained from the Swiggy API. If the menu list appears empty, update the IDs with the visible IDs from the UI under the corresponding restaurant names to ensure the menu displays correctly.

## User and Admin Credentials

To log in and test the application, use the following credentials:

User

Username: user1
Password: user123
Admin

Username: admin
Password: admin123
Features Implemented
User Authentication: Allows users to log in and access personalized features.
Restaurant Dashboard: Displays a list of restaurants fetched from the Swiggy API.
Customer Dashboard: Shows past orders and favorite restaurants for logged-in users.
Menu and Order Management: Users can view and manage their orders.
Search, Filter, and Sort Functionalities: Enhances user experience by allowing easy navigation through restaurant data.
