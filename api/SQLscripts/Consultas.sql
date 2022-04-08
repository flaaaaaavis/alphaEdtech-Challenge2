select * from users
--colunas
select users, sexo, status from users
--filtro
select cliente, sexo, status from users where status = 'Silver'
--or
select cliente, sexo, status from users where status = 'Silver' OR status = 'Platinum'
--in
select cliente, sexo, status from users where status IN ('Silver','Platinum')
--like
select cliente, sexo, status from users where cliente like '%Alb%'
-->
select * from vendas where total > 6000
--ordenção
select cliente from users
order by cliente

select cliente from users
order by cliente DESC

select cliente, status from users
order by cliente desc, status 
--BETWEEN
select * from vendas where total between 6000 and 8000
--limit
select  * from VENDAS limit 10
--distinct
select distinct status from users
--agregação
select count(*) from vendas
--agregação com where
select count(*) from vendas where total > 6000
--agrupando
select idvendedor, count(idvendedor) from vendas group by idvendedor
--having
select idvendedor, count(idvendedor) from vendas group by idvendedor
having count(idvendedor) > 40
--join com where
select nome, total from vendas, vendedores
where vendas.idvendedor = vendedores.idvendedor
--inner join
select count(*) from vendasinner join vendedores on(vendas.idvendedor = vendedores.idvendedor )
--left join
select count(*)  from vendas
left join vendedores on 
(   vendas.idvendedor = vendedores.idvendedor   )
--right join
INSERT INTO vendedores(nome) VALUES ('Fernando Amaral');
select count(*)  from vendas right join vendedores on( vendas.idvendedor = vendedores.idvendedor );
--apelidos
select cliente, total from vendas v
inner join users c on (v.idcliente = c.idcliente)














