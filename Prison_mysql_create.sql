CREATE DATABASE IF NOT EXISTS `prison_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `prison_db`;

CREATE TABLE `Inmate` (
	`inmateID` varchar(30) NOT NULL UNIQUE,
	`cellID` varchar(30) NOT NULL,
	`jobID` varchar(30) NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`age` INT(3) NOT NULL,
	`gender` varchar(5) NOT NULL,
	`bloodgroup` varchar(3) NOT NULL,
	`sentence_start` DATE NOT NULL,
	`release_date` DATE NOT NULL,
	`case_detail` varchar(500) NOT NULL,
	PRIMARY KEY (`inmateID`),
	CHECK (sentence_start < release_date)
);

CREATE TABLE `Visits` (
	`visitID` varchar(30) NOT NULL,
	`inmateID` varchar(30),
	`visitor_name` varchar(30),
	`visitor_address` varchar(100) NOT NULL,
	`visitor_phone` varchar(10) NOT NULL,
	`visitor_date` DATE NOT NULL,
	`visit_starttime` TIME NOT NULL,
	`visit_endtime` TIME NOT NULL,
	PRIMARY KEY (`visitID`)
);

CREATE TABLE `Jobs` (
	`jobID` varchar(30) NOT NULL,
	`jobDesc` VARCHAR(100) NOT NULL,
	`jobPay` INT NOT NULL,
	`job_startime` TIME NOT NULL,
	`job_endtime` TIME NOT NULL,
	PRIMARY KEY (`jobID`)
);

CREATE TABLE `Cell` (
	`cellID` varchar(30) NOT NULL,
	`cellBlock` varchar(2) NOT NULL,
	`prisonID` varchar(30) NOT NULL,
	PRIMARY KEY (`cellID`)
);

CREATE TABLE `Prison` (
	`prisonID` varchar(30) NOT NULL,
	`name` varchar(50) NOT NULL,
	`address` varchar(100) NOT NULL,
	`inmateCount` INT NOT NULL DEFAULT '0',
	`maxOccupancy` INT NOT NULL,
	PRIMARY KEY (`prisonID`)
);

CREATE TABLE `Commits` (
	`inmateID` varchar(30) NOT NULL,
	`offenceID` varchar(30) NOT NULL,
	PRIMARY KEY (`inmateID`,`offenceID`)
);

CREATE TABLE `Offence_Record` (
	`offenceID` varchar(30) NOT NULL,
	`offence_description` varchar(100) NOT NULL,
	PRIMARY KEY (`offenceID`)
);

CREATE TABLE `Personnel` (
	`personnelID` varchar(30) NOT NULL,
	`prisonID` varchar(30) NOT NULL,
	`postID` varchar(30) NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`age` INT(3) NOT NULL,
	`gender` varchar(5) NOT NULL,
	`personnel_phone` varchar(10) NOT NULL,
	`bloodgroup` varchar(3) NOT NULL,
	PRIMARY KEY (`personnelID`)
);

CREATE TABLE `Post` (
	`postID` varchar(30) NOT NULL,
	`post_name` varchar(30) NOT NULL,
	`post_description` varchar(100) NOT NULL,
	PRIMARY KEY (`postID`)
);

CREATE TABLE `Administrator` (
	`Username` VARCHAR(50) NOT NULL,
	`Password` VARCHAR(50) NOT NULL,
	`personnelID` varchar(30) NOT NULL,
	PRIMARY KEY (`Username`,`Password`,`personnelID`)
);

ALTER TABLE `Inmate` ADD CONSTRAINT `Inmate_fk0` FOREIGN KEY (`cellID`) REFERENCES `Cell`(`cellID`);

ALTER TABLE `Inmate` ADD CONSTRAINT `Inmate_fk1` FOREIGN KEY (`jobID`) REFERENCES `Jobs`(`jobID`);

ALTER TABLE `Visits` ADD CONSTRAINT `Visits_fk0` FOREIGN KEY (`inmateID`) REFERENCES `Inmate`(`inmateID`) ON DELETE SET NULL;

ALTER TABLE `Cell` ADD CONSTRAINT `Cell_fk0` FOREIGN KEY (`prisonID`) REFERENCES `Prison`(`prisonID`);

ALTER TABLE `Commits` ADD CONSTRAINT `Commits_fk0` FOREIGN KEY (`inmateID`) REFERENCES `Inmate`(`inmateID`) ON DELETE CASCADE;

ALTER TABLE `Commits` ADD CONSTRAINT `Commits_fk1` FOREIGN KEY (`offenceID`) REFERENCES `Offence_Record`(`offenceID`);

ALTER TABLE `Personnel` ADD CONSTRAINT `Personnel_fk0` FOREIGN KEY (`prisonID`) REFERENCES `Prison`(`prisonID`);

ALTER TABLE `Personnel` ADD CONSTRAINT `Personnel_fk1` FOREIGN KEY (`postID`) REFERENCES `Post`(`postID`);

ALTER TABLE `Administrator` ADD CONSTRAINT `Administrator_fk0` FOREIGN KEY (`personnelID`) REFERENCES `Personnel`(`personnelID`) ON DELETE CASCADE;

insert into Prison values('PRS1111', 'Kala Paani', 'Andaman Nicobar', 0, 5000);

insert into Cell values('CELA101', 'A1', 'PRS1111');

insert into Jobs values('DUT1010', 'Laundry', 5, '16:00:00', '18:00:00');

insert into Offence_Record values('121', 'War Against the Government of India');
insert into Offence_Record values('132', 'Mutiny');
insert into Offence_Record values('194', 'False Evidence to procure conviction for a capital offence');
insert into Offence_Record values('303', 'Murder');
insert into Offence_Record values('420', 'Fraud');
insert into Offence_Record values('305', 'Abetting Suicide');
insert into Offence_Record values('364A', 'Kidnapping for ransom');
insert into Offence_Record values('396', 'Banditry with murder');
insert into Offence_Record values('376A', 'Rape');

insert into Post values('POS2001', 'Gate Guard', 'Main Entrance Security, Monitors everyone going in and coming out of the Prison');

insert into Personnel values('PER0001', 'PRS1111', 'POS2001', 'Sidharth Pereira', 31, 'Male', '9897794991', 'A+');

insert into Inmate values('INM4269', 'CELA101', 'DUT1010', 'Amrish Pilani', 56, 'Male', 'B+', '2016-11-26', '2026-11-26', 'CASE DESCRIPTION');

insert into Commits values('INM4269', '420');

insert into Administrator values('admin', '1234', 'PER0001');

insert into Visits values('VIS0001', 'INM4269', 'Malika Pilani', 'Dombivali', '9877756555', '2021-06-15', '11:15:00', '11:30:00');
