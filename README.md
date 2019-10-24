# Toss Like a Boss

A drag-and-drop game designed to teach users the appropriate receptacle (garbage, recycling, or compost) that should be used for disposal of common items.  The application allows for organizations to register for their own accounts, schedule contests, create teams, and invite their employees to compete against one another and see how they rank in a company leaderboard.

Link to Application: Coming Soon

## Built With

React, React Drag-and-Drop, Redux, Redux-Sagas, Node, Express, PostgreSQL, Material-UI, Passport, AWS S3, and MomentJS.

## Getting Started

Please review the Prerequisites and Installation sections for steps to get this application working on a local machine.

### Prerequisites

This software is required prior to starting the application.

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Installation

Steps to get the development environment running.

1) Download this project and open in your preferred IDE.
2) Create a SQL database and tables by referencing the provided database.sql file.
3) `npm install`
4) `npm run server`
5) `npm run client`
6)  Add a .env file from the root folder.  For parts b through d, please reference the AWS S3 section of this document.
    
    a) Line 1 of your .env should be: `SERVER_SESSION_SECRET=YOURACCESSKEY`.  Replace "YOURACCESSKEY" with a strong password.  You may wish to visit [Secure Password Generator](https://passwordsgenerator.net/) for help selecting any strong password for this first line.
   
    b) Line 2 of your .env should be: `AWS_ACCESS_KEY_ID=YOURACCESSKEYID`.  Replace "YOURACCESSKEYID" with the ID that AWS S3 provides you.
    
    c) Line 3 of your .env should be: `AWS_SECRET_KEY=YOURSECRETKEY`.  Replace "YOURSECRETKEY" with the key that AWS S3 provides you.
   
    d) Line 4 of your .env should be: `AWS_BUCKET=YOURBUCKETNAME`.  Replace "YOURBUCKETNAME" with the name you provided for your bucket on AWS S3.

### AWS S3

If you wish to use the image upload feature on the Items portion of this application, AWS S3 will be required.  This involves providing a credit card to AWS, in case you exceed the provided free storage limit.  If this feature is not used, Waste Wise administrators will not be able to upload images for new items, but they will still be able to provide an image URL when maintaining the items inventory.

For detailed instructions, please reference this guide: [AWS S3 Setup Guide](https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689).  You can stop referencing this guide once you reach the section labeled "Back end."  Please note the following helpful, supplemental information below.  Step 3 & 4 especially must be reviewed.

1)  Creating an AWS S3 account: [S3 Account Setup](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
2)  Creating an AWS S3 bucket: [S3 Bucket Setup](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html)
3)  Adjusting Permissions:  When logged into your AWS S3 account, click on your bucket.  Navigate to the Permissions tab.  Under the "Block Public Access" sub-tab, click Edit and uncheck all the checkboxes on this screen, so that public access is not blocked.
4)  Updating the CORS Configuration.  Instead of the information provided in the AWS S3 Setup Guide, please copy and paste this code instead into the CORS Configuration:

`<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
</CORSRule>
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <ExposeHeader>ETag</ExposeHeader>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>`

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

![screenshot1](/screenshots/screenshot1.png)
![screenshot2](/screenshots/screenshot2.png)
![screenshot3](/screenshots/screenshot3.png)
![screenshot4](/screenshots/screenshot4.png)
![screenshot5](/screenshots/screenshot5.png)

## Documentation

[Original Scope Document](https://docs.google.com/document/d/15kyh2RjnZemqwrpsxLzq4MJ_zEyQrItEyBs-gnUVn5k/edit?usp=sharing)

### Completed Features

High level list of items completed.

- [x] Waste Wise - Administrator Settings (Items/User Maintenance)
- [x] Organization Settings (Team/Contest Settings)
- [x] Drag-and-Drop Game
- [x] Leaderboard

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Authors

[Andy Dubois](https://github.com/andydubois)

[Max Maher](https://github.com/maxwmaher)

[Michael O'Donnell](https://github.com/michaelodonnell321)

[Miles Lacek](https://github.com/TheHumanCreative)
