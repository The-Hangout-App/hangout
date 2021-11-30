-- create database hangout
CREATE DATABASE hangout;

-- use newly create database
USE hangout;

-- create table in hangout
CREATE TABLE `hangout`.`users` (
    `user_id` INT NOT NULL AUTO_INCREMENT, 
    `username` VARCHAR(30), 
    `password` VARCHAR(30), 
    `first_name` VARCHAR(30), 
    `last_name` VARCHAR(30), 
    `pronoun` VARCHAR(20), 
    `age` INT, 
    `gender` VARCHAR(20), 
    `bio` VARCHAR(50), 
    PRIMARY KEY (`user_id`)
);

-- insert sample entry
INSERT INTO `hangout`.`users` 
(`username`, `password`, `first_name`, `last_name`, `pronoun`, `age`, `gender`, `bio`,) 
VALUES ('bpulins', 'soccerislife17', 'Brigitta', 'Pulins', 'She', 21, 'Female', 'I love soccer');

CREATE TABLE `hangout`.`user_likes` (
	`likes_id` INT NOT NULL AUTO_INCREMENT, -- primary key
    `user_id` INT, -- foreign key
    `likes` VARCHAR(30),
    PRIMARY KEY (`likes_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(user_id)
);

CREATE TABLE `hangout`.`user_dislikes` (
	`dislikes_id` INT NOT NULL AUTO_INCREMENT, -- primary key
    `user_id` INT, -- foreign key
    `dislikes` VARCHAR(30),
    PRIMARY KEY (`dislikes_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(user_id)
);

CREATE TABLE `hangout`.`activity_category` (
	`activity_category_id` INT NOT NULL AUTO_INCREMENT,  -- primary key
    `activity_category_name` VARCHAR(30),
    PRIMARY KEY (`activity_category_id`)
);

CREATE TABLE `hangout`.`cards` (
	`card_id` INT NOT NULL AUTO_INCREMENT, -- primary key
    `activity_category_id` INT, -- foreign key
    `activity_name` VARCHAR(30),
    `address` VARCHAR(30),
    `phone_number` VARCHAR(30),
    `photo_url` VARCHAR(30),
    `min_num_participants` INT,
    `max_num_participants` INT,
    `min_age` INT,
    `max_age` INT,
    PRIMARY KEY (`card_id`),
    FOREIGN KEY (`activity_category_id`) REFERENCES activity_category(`activity_category_id`)
);

CREATE TABLE `hangout`.`logs` (
	`log_id` INT NOT NULL AUTO_INCREMENT, -- primary key
    `card_id` INT, -- foreign key
    `user_id` INT, -- foreign key
    `swipe_direction` VARCHAR(10),
    `preferred_gender` VARCHAR(10),
    `preferred_num_participants` INT, 
    `preferred_age_min` INT, 
    `preferred_age_max` INT, 
    `preferred_timeframe` VARCHAR(20),
    `add_friend` VARCHAR(10),
    `num_added_friends` INT,
    PRIMARY KEY (log_id),
    FOREIGN KEY (`card_id`) REFERENCES cards(`card_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(`user_id`)
);

CREATE TABLE `hangout`.`matches` ( -- still figuring this one out
	match_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`match_id`)
);

CREATE TABLE `hangout`.`chat` (
	`chat_id` INT NOT NULL AUTO_INCREMENT, -- primary key
	`date_created` date, 
    `chat_name` VARCHAR(30),
    PRIMARY KEY (`chat_id`)
);

CREATE TABLE `hangout`.`chat_members` (
	`chat_members_id` INT NOT NULL AUTO_INCREMENT, -- primary key
	`chat_id` INT, -- foreign key 
    `user_id` INT, -- foreign key
    PRIMARY KEY (`chat_members_id`),
    FOREIGN KEY (`chat_id`) REFERENCES chat(`chat_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(`user_id`)
);

CREATE TABLE `hangout`.`messages` (
	`message_id` INT NOT NULL AUTO_INCREMENT, -- primary key
	`chat_id` INT, -- foreign key
    `sender_id` INT, -- foreign key
    `message` VARCHAR(50),
    `date_sent` DATE,
    PRIMARY KEY (`message_id`),
    FOREIGN KEY (`chat_id`) REFERENCES chat(`chat_id`),
    FOREIGN KEY (`sender_id`) REFERENCES users(`user_id`)
);

INSERT INTO `hangout`.`activity_category` 
(`activity_category_name`)
VALUES ('Food'),
('Physical Activity'),
('Arts and Culture');
 
INSERT INTO `hangout`.`cards` 
(`activity_category_id`, `activity_name`, `address`, `phone_number`, `photo_url`, `min_num_participants`, `max_num_participants`, `min_age`, `max_age`) 
VALUES ('3', 'Perot Museum', '2201 N Field St, Dallas, Texas', '214-428-5555', '', 1, 20, 0, 100);

ALTER TABLE cards 
MODIFY COLUMN photo_url VARCHAR(200);

INSERT INTO `hangout`.`cards` 
(`activity_category_id`, `activity_name`, `address`, `phone_number`, `photo_url`, `min_num_participants`, `max_num_participants`, `min_age`, `max_age`, `city`, `state`, `zipcode`) 
VALUES 
(3, 'Perot Museum of Nature and Science', '2201 N Field St', '(214)428-5555', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Perot_Museum_Alamosaurus.jpg/1024px-Perot_Museum_Alamosaurus.jpg', 1, 20, 18, 100, 'Dallas', 'Texas', '75201'), 
(3, 'The Nutcracker Presented By Texas Ballet Theatre', '2403 Flora St', '(214)880-0202', 'https://visitdallas.imgix.net/usersub/16353cd9-25ed-11ec-9b2c-fa163e23cf16_1633537237_photo.png?w=360&h=300&fit=fill&crop=edges,faces&q=60&fm=pjpg&dpr=3&auto=compress,format,redeye&trim=auto', 1, 20, 18, 100, 'Dallas', 'Texas', '75201'), 
(3, 'Dallas Farmers Market', '920 S Harwood St', '(214)664-9110', 'https://dallasfarmersmarket.org/wp-content/uploads/2019/04/TheShed2.jpg', 1, 20, 18, 100, 'Dallas', 'Texas', '75201'), 
(3, 'Dallas Symphony Christmas Pops', '2301 Flora St', '(214)849-4376', 'https://visitdallas.imgix.net/21.22_Christmas.Pops_Social.Graphics_1080x1080_06.09.21_sans.Logos.jpg?w=360&h=300&fit=fill&crop=edges,faces&q=60&fm=pjpg&dpr=3&auto=compress,format,redeye&trim=auto', 1, 20, 15, 100, 'Dallas', 'Texas', '75201'), 
(3, 'Van Gogh and the Olive Groves Dallas Museum of Art', '1717 North Harwood Street', '(214)922-1200', 'https://visitdallas.imgix.net/itineraries/Arts_District/DMA_art_gallery.jpg?w=360&h=300&fit=fill&crop=edges,faces&q=60&fm=pjpg&dpr=3&auto=compress,format,redeye&trim=auto', 1, 20, 18, 100, 'Dallas', 'Texas', '75201'), 
(3, 'Studio Arts Art Classes', '10051 Shoreview Road', '(214)827-1222', 'https://www.gotostcroix.com/wp-content/uploads/2018/06/edit_take-art-class.jpg', 1, 5, 6, 100, 'Dallas', 'Texas', '75238'), 
(3, 'Studio22 Ballroom Dancing', '14902 Preston Road Suite 400', '(972)490-0022', 'https://www.dancepassionfl.com/wp-content/uploads/2019/01/wait-to-practice-450.jpg', 1, 4, 18, 100, 'Dallas', 'Texas', '75254'), 
(3, 'Dallas World Aquarium', '1801 N Griffin St', '(214)720-2224', 'https://i0.wp.com/dallasnativeblog.com/wp-content/uploads/2020/01/dallas-world-aquarium.jpg?fit=960%2C643&ssl=1', 1, 20, 0, 100, 'Dallas', 'Texas', '75202'), 
(3, 'Dallas Arboretum and Botanical Garden', '8525 Garland Rd', '(214)515-6615', 'https://visitdallas-sv.imgix.net/crm/dallas/10-9-17-007edit_36C312BD-4A99-435C-850DCBDC2E39BEB9_02f2ba21-d003-4eee-872eacdc13f43c58.jpg?w=800&h=600&fit=fill&crop=edges,faces&q=60&fm=pjpg&dpr=3&auto=compress,format,redeye&trim=auto', 1, 20, 0, 100, 'Dallas', 'Texas', '75218'), 
(3, 'Escapology Escape Room', '2375 Victory Park Ln Suite 110', '(469)421-1445', 'https://3q87le1gsko01ibim33e4wib-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/Gold-Rush-2-1024x683.jpg', 1, 5, 18, 100, 'Dallas', 'Texas', '75219'),
(2, 'Running on Katy Trail', '3505 Maple Avenue', '(214)303-1180', 'https://uptown101.com/wp-content/uploads/2014/05/Katy-Trail-Uptown-Dallas-area.jpg', 1, 10, 18, 100, 'Dallas', 'Texas', '75201'), 
(2, 'Biking on Katy Trail', '3505 Maple Avenue', '(214)303-1180', 'http://www.apartmentagents.com/blog/wp-content/uploads/2014/10/Katy-Trail-600x450.jpg', 1, 10, 18, 100, 'Dallas', 'Texas', '75201'), 
(2, 'Soul Cycle Cycling Class', '3699 McKinny Ave', '(214)360-7685', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/soul-cycle-main-1569603758.jpg', 1, 15, 18, 100, 'Dallas', 'Texas', '75204'), 
(2, 'Summit Rock Climbing', '9201 Forest Ln', '(972)231-7625', 'https://images.squarespace-cdn.com/content/v1/5f02a77ef799b16985a55165/1597951599918-JGK50YU6FTHZ7BYLXP11/DSC02646.jpg', 1, 10, 18, 100, 'Dallas', 'Texas', '75243'), 
(2, 'SMU Dedman Swimming', '6000 Bush Ave', '(214)768-3374', 'https://www.enjoy-swimming.com/wp-content/uploads/swimming-pool-etiquette.jpg', 1, 5, 18, 100, 'Dallas', 'Texas', '75205'), 
(2, 'Summit Yoga', '9201 Forest Ln', '(972)231-7625', 'https://images.squarespace-cdn.com/content/v1/5f02a77ef799b16985a55165/1597010798807-AAOUV0B8XXQUZ798CS6N/DSC01385.jpg', 1, 6, 18, 100, 'Dallas', 'Texas', '75243'), 
(2, 'SMU Dedman Lift', '6000 Bush Ave', '(214)768-3374', 'https://i.insider.com/5f625fde57b7da001ee120b0?width=700', 1, 6, 18, 100, 'Dallas', 'Texas', '75205'), 
(2, 'SMU Dedman Rock Climbing', '6000 Bush Ave', '(214)768-3374', 'https://www.smu.edu/-/media/Site/StudentAffairs/RecSports/ClimbingWall/29726D_060.JPG?h=488&la=en&w=732&hash=3D3ECBECC711633AB8A27DF5D5C10F9A', 1, 3, 18, 100, 'Dallas', 'Texas', '75205'), 
(2, 'SMU Dedman Pickup Baskeball', '6000 Bush Ave', '(214)768-3374', 'https://wp-denverite.s3.amazonaws.com/wp-content/uploads/sites/4/2017/08/7351419498_3b5aafce18_k-600x400.jpg', 6, 15, 18, 100, 'Dallas', 'Texas', '75205'), 
(2, 'SMU Sand Volleyball', '6000 Bush Ave', '(214)768-3374', 'https://www.smu.edu/-/media/Site/StudentAffairs/RecSports/Intramurals/intramurals-copy.jpg?h=488&la=en&w=732&hash=3D768FB9EAA6A4EAABCC633363A4EBFD', 6, 10, 18, 100, 'Dallas', 'Texas', '75205'), 
(2, 'Topgolf', '8787 Park Ln', '(214)-341-9600', 'https://visitdallas-sv.imgix.net/crm/dallas/94814949_topgolf_lifestyle-sa-336_58289F32-5056-B3A8-494CD2741C592D58-58289c675056b3a_58289f8c-5056-b3a8-496230761f290d32.jpg?w=800&h=600&fit=fill&crop=edges,faces&q=60&fm=pjpg&dpr=3&auto=compress,format,redeye&trim=auto', 1, 10, 18, 100, 'Dallas', 'Texas', '75231'),
(1, 'Katy Trail Ice House', '3127 Routh St', '(214)468-0600', 'https://media.cntraveler.com/photos/5bc4ca7299a6f731905be830/16:9/w_2560,c_limit/KTIceHouse-11_WillGraham.jpg', 0, 10, 21, 100, 'Dallas', 'Texas', '75201'), 
(1, 'Medieval Times', '2021 N Stemmons Fwy', '(214)761-1801', 'https://visitdallas.imgix.net/Guides/Medieval_Times/MedievalTimes-Horses.jpg?w=1356&h=420&q=40&crop=edges,faces&fit=fill&fm=pjpg&dpr=3&auto=compress,format,redeye&trim=auto', 1, 20, 0, 100, 'Dallas', 'Texas', '75207'), 
(1, 'Nobu Restaurant', '400 Crescent Ct', '(214)252-7000', 'https://www.crescentcourt.com/wp-content/uploads/2018/03/Sushi.jpg', 1, 10, 21, 100, 'Dallas', 'Texas', '75201'), 
(1, 'Cinepolis Luxury Cinemas', '2365 Victory Park Ln', '(214)953-2202', 'https://ca-times.brightspotcdn.com/dims4/default/ac054ac/2147483647/strip/true/crop/2048x1152+0+0/resize/840x473!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F72%2F9e%2Fa59718e29e0a93dcedf9009e1d31%2Fla-1541486171-g7s20e24vh-snap-image', 1, 10, 0, 100, 'Dallas', 'Texas', '75219'), 
(1, 'Flower Child Restaurant', '2101 Cedar Springs Rd', '(469)904-6310', 'https://img1.10bestmedia.com/Images/Photos/342460/10best-healthyrestaurants-flowerchild_55_660x440.jpg', 1, 10, 0, 100, 'Dallas', 'Texas', '75201'), 
(1, 'Dragonfly Restaurant', '2332 Leonard St', '(214)550-9500', 'https://dfbydm9fa7av1.cloudfront.net/hotelzaza.com-1440449613/cms/imagepool/53c69ee072017.jpg', 1, 10, 0, 100, 'Dallas', 'Texas', '75201'), 
(1, 'Truck Yard', '5624 Sears St', '(469)500-0139', 'https://cdn.vox-cdn.com/thumbor/z3zJQO_ZGXOaDtsW5icvFB3GXFg=/33x0:966x700/1200x800/filters:focal(33x0:966x700)/cdn.vox-cdn.com/uploads/chorus_image/image/38869046/Msivin_TruckYard4.0.jpg', 1, 10, 21, 100, 'Dallas', 'Texas', '75206'), 
(1, 'Party Bike', '3909 Main', '(214)414-3891', 'http://www.dallaspartybike.com/wp-content/uploads/2014/11/bachelorette-4.jpg', 1, 14, 21, 100, 'Dallas', 'Texas', '75226'), 
(1, 'Taco Bell Restaurant', '2404 N Washington Ave', '(214)821-4866', 'https://d1ralsognjng37.cloudfront.net/009fb4ac-0445-441f-84aa-86a484351127.jpeg', 1, 10, 0, 100, 'Dallas', 'Texas', '75204'), 
(1, 'Trader Joes Grocery Shopping', '4525 Cole Avenue', '(214)599-2155', 'https://www.signalsaz.com/wp-content/uploads/2020/03/trader-joes-1.jpg', 1, 5, 0, 100, 'Dallas', 'Texas', '75205');

ALTER TABLE cards
MODIFY COLUMN image_url VARCHAR(200);

ALTER TABLE `hangout`.`cards` 
ADD `city` VARCHAR(20),
ADD `state` VARCHAR(10),
ADD `zipcode` VARCHAR(10);

CREATE TABLE `hangout`.`users_in_groups` (
	`group_pk` INT NOT NULL AUTO_INCREMENT, -- primary key
	`group_id` INT, -- foreign key
    `user_id` INT, -- forign key
    PRIMARY KEY (`group_pk`),
    FOREIGN KEY (`group_id`) REFERENCES `groups`(group_id),
    FOREIGN KEY (`user_id`) REFERENCES users(user_id)
);

CREATE TABLE `hangout`.`groups` (
	`group_id` INT NOT NULL AUTO_INCREMENT, -- primary key
    `card_id` INT, -- forign key
    PRIMARY KEY (`group_id`),
    FOREIGN KEY (`card_id`) REFERENCES cards(card_id)
);

DROP TABLE `hangout`.`matches`;
DROP TABLE `hangout`.`logs`;


INSERT INTO `hangout`.`groups` 
(`group_id`, `card_id`)
VALUES (1, 3), -- card 3 (The Nutcracker) is associated with group 1 
(2, 4), -- card 4 (Dallas Farmers Market) is associated with group 2
(3, 7), -- card 7 (Studio Arts Art Classes) is associated with group 3
(4, 7); -- card 7 (Studio Arts Art Classes) is associated with group 4

INSERT INTO `hangout`.`users_in_groups` 
(`group_pk`, `group_id`, `user_id`)
VALUES (1, 1, 3), -- user 3 is in group 1
(2, 1, 4), -- user 4 is also in group 1
(3, 1, 5), -- user 5 is also in group 1
(4, 2, 6); -- user 6 is in group 2

ALTER TABLE `users` 
MODIFY COLUMN password VARCHAR(100);
