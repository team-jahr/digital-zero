insert into location (name) values ('Stockholm') on conflict (id) do nothing;
insert into location (name) values ('Uppsala') on conflict (id) do nothing;
insert into location (name) values ('Malmö') on conflict (id) do nothing;

-- -------------------------------------------------------------------------------------------------
insert into area (name, location_id) values ('Hall 111', 1) on conflict (id) do nothing;
insert into area (name, location_id) values ('Hall 222', 1) on conflict (id) do nothing;
insert into area (name, location_id) values ('Hall 333', 1) on conflict (id) do nothing;

insert into area (name, location_id) values ('Hall 444', 2) on conflict (id) do nothing;
insert into area (name, location_id) values ('Hall 555', 2) on conflict (id) do nothing;
insert into area (name, location_id) values ('Hall 666', 2) on conflict (id) do nothing;

insert into area (name, location_id) values ('Hall 777', 3) on conflict (id) do nothing;
insert into area (name, location_id) values ('Hall 888', 3) on conflict (id) do nothing;

-- -------------------------------------------------------------------------------------------------
insert into app_user (email, location_id) values ('test@gmail.com', 2) on conflict (id) do nothing;

-- -------------------------------------------------------------------------------------------------
insert into inspection (description, date, submitted, reported_to, area_id, app_user_id)
values ('', '2021-03-04', false, '', 1, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id)
values ('No issues found', '2021-03-04', false, '', 2, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id)
values ('', '2021-03-04', false, '', 3, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id)
values ('', '2021-03-03', false, '', 4, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id)
values ('No issues found', '2021-03-02', false, '', 5, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id)
values ('No issues found', '2024-03-01', true, '', 6, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id)
values ('No issues found', '2021-03-04', false, '', 7, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id)

values ('No issues found', '2021-03-04', false, '', 8, 1);

values ('No issues found', '2021-03-04', true, '', 8, 1);


insert into inspection (description, date, submitted, reported_to, area_id, app_user_id)
values ('No issues found', '2021-03-02', false, '', 1, 1);

insert into inspection (description, date, submitted, reported_to, area_id, app_user_id)
values ('No issues found', '2021-03-04', false, '', 1, 1);

-- -------------------------------------------------------------------------------------------------
-- insert into issue (title, description, severity, img_ref)
-- values (
--         'Grip carpet at station 1',
--         'Starting to get worn out, will become a security liability soon',
--         'warning',
--         ''
--         );
--
-- insert into issue (title, description, severity, img_ref)
-- values (
--            'Malfunction machine x',
--            'Unusable machine x, most be repaired asap',
--            'warning',
--            ''
--        );
--
-- insert into issue (title, description, severity, img_ref)
-- values (
--            'Grip carpet at station 1',
--            'Starting to get worn out, will become a security liability soon',
--            'warning',
--            ''
--        );
--
-- insert into issue (title, description, severity, img_ref)
-- values (
--            'Grip carpet at station 1',
--            'Starting to get worn out, will become a security liability soon',
--            'warning',
--            ''
--        );
--
-- insert into issue (title, description, severity, img_ref)
-- values (
--            'Grip carpet at station 1',
--            'Starting to get worn out, will become a security liability soon',
--            'warning',
--            ''
--        );