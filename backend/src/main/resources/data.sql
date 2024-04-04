insert into location (name) values ('Stockholm');
insert into location (name) values ('Uppsala');
insert into location (name) values ('Malmö');

-- -------------------------------------------------------------------------------------------------
insert into area (name, location_id) values ('Hall 111', 1);
insert into area (name, location_id) values ('Hall 222', 1);
insert into area (name, location_id) values ('Hall 333', 1);

insert into area (name, location_id) values ('Hall 444', 2);
insert into area (name, location_id) values ('Hall 555', 2);
insert into area (name, location_id) values ('Hall 666', 2);

insert into area (name, location_id) values ('Hall 777', 3);
insert into area (name, location_id) values ('Hall 888', 3);

-- -------------------------------------------------------------------------------------------------
insert into app_user (email, location_id) values ('test@gmail.com', 2);

-- -------------------------------------------------------------------------------------------------
insert into inspection (description, date, submitted, reported_to, area_id, app_user_id) values ('', '2021-03-04', 0, '', 1, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id) values ('No issues found', '2021-03-04', 1, 'jimmyhampussoderberg@gmail.com', 2, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id) values ('', '2021-02-01', 1, 'jimmyhampussoderberg@gmail.com', 3, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id) values ('', '2021-03-03', 0, '', 4, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id) values ('No issues found', '2021-03-02', 1, 'jimmyhampussoderberg@gmail.com', 5, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id) values ('No issues found', '2021-03-01', 0, '', 6, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id) values ('No issues found', '2021-03-02', 1, 'jimmyhampussoderberg@gmail.com', 7, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id) values ('No issues found', '2021-03-03', 0, '', 8, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id) values ('No issues found', '2021-03-01', 1, 'jimmyhampussoderberg@gmail.com', 1, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id) values ('No issues found', '2021-03-02', 1, 'jimmyhampussoderberg@gmail.com', 1, 1);

-------------------------------------------------------------------------------------------------
insert into issue (title, description, severity, img_ref) values ('Grip carpet at station 1', 'Starting to get worn out, will become a security liability soon', 'warning', '');

insert into issue (title, description, severity, img_ref) values ('Malfunction machine x', 'Unusable machine x, most be repaired asap', 'critical', '');

insert into issue (title, description, severity, img_ref) values ('Staff not following safety procedures', 'Not using the mandatory safety equipment, potential liability', 'alert', '');

insert into issue (title, description, severity, img_ref) values ('Broken chair at room 5', 'Causes non-ergonomic work positions for employees', 'alert', '');

insert into issue (title, description, severity, img_ref) values ('Lack of reserve parts for machine y', 'Potential issue if machine y breaks and maintenance is required', 'warning', '');

-- -------------------------------------------------------------------------------------------------
insert into inspection_issue (inspection_id, issue_id) values (1, 1);
insert into inspection_issue (inspection_id, issue_id) values (1, 2);
insert into inspection_issue (inspection_id, issue_id) values (1, 3);

insert into inspection_issue (inspection_id, issue_id) values (2, 3);

insert into inspection_issue (inspection_id, issue_id) values (3, 2);

insert into inspection_issue (inspection_id, issue_id) values (4, 4);
insert into inspection_issue (inspection_id, issue_id) values (4, 5);

insert into inspection_issue (inspection_id, issue_id) values (7, 1);
insert into inspection_issue (inspection_id, issue_id) values (7, 5);
insert into inspection_issue (inspection_id, issue_id) values (7, 3);