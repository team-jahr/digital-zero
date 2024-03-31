insert into location values (1, 'Stockholm') on conflict (id) do nothing;
insert into location values (2, 'Uppsala') on conflict (id) do nothing;
insert into location values (3, 'Malmö') on conflict (id) do nothing;


insert into area (id, name, location_id) values (1,'Hall 111', 1) on conflict (id) do nothing;
insert into area (id, name, location_id) values (2,'Hall 222', 1) on conflict (id) do nothing;
insert into area (id, name, location_id) values (3,'Hall 333', 1) on conflict (id) do nothing;


insert into area (id, name, location_id) values (4,'Hall 444', 2) on conflict (id) do nothing;
insert into area (id, name, location_id) values (5,'Hall 555', 2) on conflict (id) do nothing;
insert into area (id, name, location_id) values (6,'Hall 666', 2) on conflict (id) do nothing;

insert into area (id, name, location_id) values (7,'Hall 777', 3) on conflict (id) do nothing;
insert into area (id, name, location_id) values (8,'Hall 888', 3) on conflict (id) do nothing;

insert into app_user (id, email, location_id) values (1, 'test@gmail.com', 2) on conflict (id) do nothing;
insert into issue (title, img_ref, severity, description) values('Test1', '10.png,20.png', 'Warning', 'No proper shoes') on conflict (id) do nothing;
insert into issue (title, img_ref, severity, description) values('Test2', '20.png,10.png', 'Warning', 'No proper shoes2') on conflict (id) do nothing;