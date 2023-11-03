-- SQLite
drop table pictures;

create table pictures(
  pic_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  path TEXT NOT NULL
);