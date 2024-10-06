set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.hello_world()
 RETURNS TABLE(id integer, name text, count integer)
 LANGUAGE sql
AS $function$
select c.id, c.name,
    count(b.category_id)
from category c
left join book b on c.id = b.category_id
group by c.id, c.name
$function$
;


