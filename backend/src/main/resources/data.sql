insert into location values (1, 'Stockholm') on conflict (id) do nothing;
insert into location values (2, 'Uppsala') on conflict (id) do nothing;
insert into location values (3, 'Malmö') on conflict (id) do nothing;


insert into area values (1,'Hall 111', 1) on conflict (id) do nothing;
insert into area values (2,'Hall 222', 1) on conflict (id) do nothing;
insert into area values (3,'Hall 333', 1) on conflict (id) do nothing;


insert into area values (4,'Hall 444', 2) on conflict (id) do nothing;
insert into area values (5,'Hall 555', 2) on conflict (id) do nothing;
insert into area values (6,'Hall 666', 2) on conflict (id) do nothing;

insert into area values (7,'Hall 777', 3) on conflict (id) do nothing;
insert into area values (8,'Hall 888', 3) on conflict (id) do nothing;

insert into app_user values (1, 'test@gmail.com', 2) on conflict (id) do nothing;
insert into issue values(1, 'Test1', '', 'Warning', 'No proper shoes') on conflict (id) do nothing;
insert into issue values(2, 'Test2', '', 'Warning', 'No proper shoes2') on conflict (id) do nothing;