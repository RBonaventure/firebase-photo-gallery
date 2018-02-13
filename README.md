Dummy photo gallery website
===

Author : Raphaël Bonaventure

------------

This example uses Firebase Hosting and Firebase Functions to dynamically serve a single page application. This is as basic as it gets.

------------

# Getting started :

## Populate the database :
- Login in the [Firebase Console](https://console.firebase.google.com)
- Create a New Project or Open an existing one
- Open the Database tab
- Click on the 3 dots > Import JSON
- You can use "doc/database.json" as an example for the data structure

## Customize the Favicon :
- The "public" folder contains the manifest.json file, modify it to use your own title
- Use your own favicon.ico / favicon-16x16.png / favicon-32x32.png / apple-touch-icon.png but keep the naming of the files

## Deploy :
```
firebase login
firebase use your-firebase-project
firebase deploy
```

------------

# Example
![Sample](./doc/screenshot.png)

------------

# License

Copyright 2018 Raphaël Bonaventure

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.