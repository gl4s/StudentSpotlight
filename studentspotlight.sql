-- Active: 1697704729751@@127.0.0.1@3306@studentspotlight

-- CREATE DATABASE IF NOT EXISTS studentspotlight CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;

-- USE studentspotlight;


-- CREATE TABLE Users (
--     UserID INT PRIMARY KEY AUTO_INCREMENT,
--     Username VARCHAR(255) UNIQUE NOT NULL,
--     PasswordHash VARCHAR(255),
--     Salt VARCHAR(50),
--     UserType ENUM('student', 'teacher', 'schooladmin', 'systemadmin') NOT NULL
-- );


-- CREATE TABLE Students (
--     StudentID INT PRIMARY KEY AUTO_INCREMENT,
--     UserID INT UNIQUE,
--     FirstName VARCHAR(255) NOT NULL,
--     LastName VARCHAR(255) NOT NULL,
--     Email VARCHAR(255),
--     PhoneNumber VARCHAR(20),
--     ExcuseFK INT,
--     FOREIGN KEY (UserID) REFERENCES Users(UserID),
-- );

-- CREATE TABLE Teachers (
--     TeacherID INT PRIMARY KEY AUTO_INCREMENT,
--     UserID INT UNIQUE,
--     FirstName VARCHAR(255) NOT NULL,
--     LastName VARCHAR(255) NOT NULL,
--     Email VARCHAR(255),
--     PhoneNumber VARCHAR(20),
--     ExcuseFK INT,
--     FOREIGN KEY (UserID) REFERENCES Users(UserID),
-- );

-- CREATE TABLE Schools (
--     SchoolID INT PRIMARY KEY AUTO_INCREMENT,
--     SchoolName VARCHAR(255) NOT NULL,
--     SchoolIdentifier VARCHAR(50) UNIQUE NOT NULL,
--     Address VARCHAR(255)
-- );

-- CREATE TABLE Admins (
--     AdminID INT PRIMARY KEY AUTO_INCREMENT,
--     AdminName VARCHAR(255)  NOT NULL,
--     SpecialKey VARCHAR(8) UNIQUE NOT NULL,
-- );

-- CREATE TABLE Courses (
--     CourseID INT PRIMARY KEY AUTO_INCREMENT,
--     CourseName VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE Classes (
--     ClassID INT PRIMARY KEY AUTO_INCREMENT,
--     ClassName VARCHAR(255) NOT NULL,
--     SchoolID INT,
--     FOREIGN KEY (SchoolID) REFERENCES Schools(SchoolID)
-- );

-- CREATE TABLE Schedule (
--     ScheduleID INT PRIMARY KEY AUTO_INCREMENT,
--     UserID INT,
--     CourseID INT,
--     ClassID INT,
--     DayOfWeek VARCHAR(15),
--     StartTime TIME,
--     EndTime TIME,
--     FOREIGN KEY (UserID) REFERENCES Users(UserID),
--     FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
--     FOREIGN KEY (ClassID) REFERENCES Classes(ClassID)
-- );

-- CREATE TABLE Grades (
--     GradeID INT PRIMARY KEY AUTO_INCREMENT,
--     StudentID INT,
--     CourseID INT,
--     TeacherID INT,
--     Grade FLOAT,
--     Date DATE,
--     Description VARCHAR(255),
--     FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
--     FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
--     FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID)
-- );

-- CREATE TABLE Notifications (
--     NotificationID INT PRIMARY KEY AUTO_INCREMENT,
--     UserID INT,
--     Content TEXT,
--     DateTime DATETIME,
--     FOREIGN KEY (UserID) REFERENCES Users(UserID)
-- );

-- CREATE TABLE Documents (
--     DocumentID INT PRIMARY KEY AUTO_INCREMENT,
--     UserID INT,
--     Type VARCHAR(50),
--     Content BLOB,
--     FOREIGN KEY (UserID) REFERENCES Users(UserID)
-- );

-- CREATE TABLE Attendance (
--     AttendanceID INT PRIMARY KEY AUTO_INCREMENT,
--     ScheduleID INT,
--     StudentID INT,
--     Date DATE,
--     Status ENUM('present', 'absent'),
--     FOREIGN KEY (ScheduleID) REFERENCES Schedule(ScheduleID),
--     FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
-- );

-- CREATE TABLE Excuses (
--     ExcuseID INT PRIMARY KEY AUTO_INCREMENT,
--     StudentID INT,
--     TeacherID INT,
--     Date DATE,
--     Description TEXT,
--     Image BLOB,
--     Status VARCHAR(50),
--     FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
--     FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID)
-- );


DROP DATABASE studentspotlight;

CREATE DATABASE IF NOT EXISTS studentspotlight CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;

USE studentspotlight;

CREATE TABLE Schools (
    SchoolID INT PRIMARY KEY AUTO_INCREMENT,
    SchoolName VARCHAR(255) UNIQUE NOT NULL,
    SchoolIdentifier VARCHAR(50) UNIQUE NOT NULL,
    Address VARCHAR(255)
);

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY AUTO_INCREMENT,
    CourseName VARCHAR(255) NOT NULL
);

CREATE TABLE Classes (
    ClassID INT PRIMARY KEY AUTO_INCREMENT,
    ClassName VARCHAR(255) NOT NULL,
    SchoolID INT,
    FOREIGN KEY (SchoolID) REFERENCES Schools(SchoolID)
);

CREATE TABLE Omission (
    OmissionID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT,
    TeacherID INT,
    Date DATE,
    Description TEXT,
    Image BLOB,
    Status VARCHAR(50)
);

CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255),
    Salt VARCHAR(50),
    UserType ENUM('student', 'teacher', 'schooladmin', 'systemadmin') NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    PhoneNumber VARCHAR(20),
    OmissionFK INT,
    FOREIGN KEY (OmissionFK) REFERENCES Omission(OmissionID) ON DELETE SET NULL
);

CREATE TABLE Schedule (
    ScheduleID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    CourseID INT,
    ClassID INT,
    DayOfWeek VARCHAR(1),
    StartTime TIME,
    EndTime TIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    FOREIGN KEY (ClassID) REFERENCES Classes(ClassID)
);

CREATE TABLE Grades (
    GradeID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT,
    CourseID INT,
    TeacherID INT,
    Grade FLOAT,
    Date DATE,
    Description VARCHAR(255),
    FOREIGN KEY (StudentID) REFERENCES Users(UserID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    FOREIGN KEY (TeacherID) REFERENCES Users(UserID)
);

CREATE TABLE Notifications (
    NotificationID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Content TEXT,
    DateTime DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Documents (
    DocumentID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Type VARCHAR(50),
    Content BLOB,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Attendance (
    AttendanceID INT PRIMARY KEY AUTO_INCREMENT,
    ScheduleID INT,
    StudentID INT,
    Date DATE,
    Status ENUM('present', 'absent'),
    FOREIGN KEY (ScheduleID) REFERENCES Schedule(ScheduleID),
    FOREIGN KEY (StudentID) REFERENCES Users(UserID)
);
