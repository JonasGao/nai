drop table if exists  bt_feeding_record;
create table bt_feeding_record (
                                   id int primary key auto_increment comment 'ID',
                                   date date not null comment '喂养日期',
                                   time time not null comment '喂养日期',
                                   operation varchar(255) not null comment '【枚举定义】喂养行为类型',
                                   value int not null comment '喂养数据',
                                   creator varchar(255) not null comment '创建人',
                                   modifier varchar(255) not null comment '修改人',
                                   created timestamp not null default current_timestamp comment '创建时间',
                                   modified timestamp not null default current_timestamp on update current_timestamp comment '最后修改时间'
);
