
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"
(
  "id" serial NOT NULL,
  "first_name" varchar(40) NOT NULL,
  "last_name" varchar(50) NOT NULL,
  "username" varchar(60) NOT NULL UNIQUE,
  "password" varchar(100) NOT NULL,
  "wastewise_admin" BOOLEAN NOT NULL,
  "organization_id" integer,
  CONSTRAINT "user_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "contest"
(
  "id" serial NOT NULL,
  "contest_name" varchar(100) NOT NULL,
  "access_code" integer NOT NULL,
  "compost" BOOLEAN NOT NULL,
  "start_date" varchar(25) NOT NULL,
  "start_time" varchar(25) NOT NULL,
  "end_date" varchar(25) NOT NULL,
  "end_time" varchar(25) NOT NULL,
  "organization_id" integer NOT NULL,
  CONSTRAINT "contest_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "organization"
(
  "id" serial NOT NULL,
  "organization_name" varchar(120) NOT NULL,
  CONSTRAINT "organization_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "team"
(
  "id" serial NOT NULL,
  "team_name" varchar(50) NOT NULL,
  "organization_id" integer NOT NULL,
  CONSTRAINT "team_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "score"
(
  "id" serial NOT NULL,
  "first_name" varchar(40) NOT NULL,
  "last_name" varchar(50) NOT NULL,
  "email_address" varchar(80) NOT NULL,
  "score" integer NOT NULL,
  "time" integer NOT NULL,
  "contest_id" integer NOT NULL,
  "team_id" integer NOT NULL
);



CREATE TABLE "item"
(
  "id" serial NOT NULL,
  "name" varchar(60) NOT NULL,
  "url" varchar(1000) NOT NULL,
  "receptacle" varchar(30) NOT NULL,
  "correct_count" integer,
  "number_of_instances" integer,
  "item_text" varchar(300),
  CONSTRAINT "item_pk" PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("organization_id") REFERENCES "organization"("id");

ALTER TABLE "contest" ADD CONSTRAINT "contest_fk0" FOREIGN KEY ("organization_id") REFERENCES "organization"("id");

ALTER TABLE "team" ADD CONSTRAINT "team_fk0" FOREIGN KEY ("organization_id") REFERENCES "organization"("id");

ALTER TABLE "score" ADD CONSTRAINT "score_fk0" FOREIGN KEY ("contest_id") REFERENCES "contest"("id");

ALTER TABLE "score" ADD CONSTRAINT "score_fk1" FOREIGN KEY ("team_id") REFERENCES "team"("id");

--Optional inserts for items

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Aluminum Container', 'https://previews.dropbox.com/p/thumb/AAmxgKBa8cywRFeMGVIjG_084-k3zbGqKxhBLaGf6mAw2gT3491RYietJ_MLAyE1tXf2yPG8909UGmKzM7Hh7K8ImP0Ygn1eU14oZUspXmZeKv1F2Tc8XWCpTJ4ENtDHvWLuUNgIFJmQZUQUG0pjXqKK0sj1PABX-YXellPOy6FGFY6NqE8fIRF5gRaNPbAAoP9GLQkltxjtibgdXlbW0-lJBBBS3DVAGo0oN0rfcyZWlby4SlaowgXmMqFrF06rL0TYYAgbOz5oOd5M2ksX9oX3mjVpgI7mVvR-DebbHrgmpG8WBFnsQXer-sqZiIcFKwX7b-VbjpepgRyd3V6NylR8/p.jpeg?fv_content=true&size_mode=5', 'recycle', '0', '0', 'More than just aluminum cans are recyclable. Make sure foil and other aluminum containers are relatively clean before recycle');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Banana Peel', 'https://previews.dropbox.com/p/thumb/AAlbtmoqMXpcme7C-c1AF08n0hlAbdscNKGO-ryNQTGXd4zC6A5c8dqQxlJCDQwee7SSx-PLG43PT29kfFvh1yfFXgCzHUgMK-VevjpIVUka_JNgYBWmyevBNYyHYuVfK2AwsPioMpQVh4w2Gim2xmYZwIes4ijjl_Ld7IzfgPnDUh9h-wEccoMnS4McydCPB386IXniXkHOOeWj9Jnf6P_qMw4JaMSZrumTKpkkqMt4pDMnXBRARz5zQg1jiQht1x9zcvLVJKrhfQpQVNqji5fnfvDnhrcBevDbOc9pkWVWLPC5j3VV3R7NJzCu0-qaEwMRki1LO5BpL00LIujVh-Hh/p.jpeg?fv_content=true&size_mode=5', 'compost', '0', '0', 'Food scraps are easily composted');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Black Plastic', 'https://previews.dropbox.com/p/thumb/AAn3VIDFsL97jh0cvLt1M5dJmwd2Um-TbtyzF0DZkw5HThq9-meM0sGtrFeokgNfX1WTgnPTLxjoP6So5KAkaci8fg4HoMhUjkxNVeKNeyWQKh0Lb_0lK2eW-SPNlzvAa6CW9qi31I2IvMisKTpU6YJzVvw19au7LObG8UFZKQky-l0lH2ri4stMu7V6fokZypleY3MaXgMX_h40l6vc-TLmqijPRQUBGCRWgR8k6OZVCFdEgoT7YcasZvfr3yM9vCCHFtmPgAACWlRU4mOX5eCwau0XgQxu9Z8YcylXW9C7cPYJfdkgUUs5Xxv5b7gF_viIkv4XXrkABwve6doQ7gzv/p.png?fv_content=true&size_mode=5', 'garbage', '0', '0', 'Black plastic has little value as a recyclable, put it in the trash');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Carrots', 'https://previews.dropbox.com/p/thumb/AAl5xhusTJ97A5fwM4kyt3HcRysZColHei9Evk_Kk4W_qBy0YjtMdrj2fvrHPoRhLoISxLFFKVeTSKAYYD9HfrhKQR3mNIJBrgqjL6K8T7y48VR5OiHu61nOE-PMPy3ippt3go4F-yJn33-hIDcmmb-25SXqWbmIpVAIO3x1gfabVWY1YCtzQzTz1dF0tLxMNE9h1_ZAtwIDfTXXePba01wNHt1r6il1CA0U6bdbFXsG8I9QehGfGR85TMaYCod_fvwuRS-U1PQDSp09LSDMi1-4xrWVQujhCFaQ6hHVwVE3DwmFNLvMcSTS1yfLpWJVYf6mQeXv1ym8ZGMCmXKdmWim/p.png?fv_content=true&size_mode=5', 'compost', '0', '0', 'Food scraps are easily composted');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Milk Carton', 'https://previews.dropbox.com/p/thumb/AAl-kXNUI-94IT8pva8KYGwkHhc6abRBgS5uXybgVG7GkAIFZ3IHCQVa460zZD_LM-r33qSjyghQEzN7dcwywE9T0tcBOd7cCboKPt3TiPos1tJCSHj5fK--ntfnpoYBN3ClE3B9ETmi4iEwNZX_894O9xYGzGDN_cAvgyeYTJb54iXeglFcE9Z2d51aIRteVxh-NH2_8LARox4gSwVqMlW2jKVTvGaPCWOvO_5tFuBJ-m6nsyWldJD4mimbzPPFe6Og67Xds34xIHSe0aPHgb_JRin33rOIq7OMg9mMuhVNr7OtJzYUZSy2PFuN6VC1PE9DJHJBkxBGUBt1sSZD7Tz8/p.jpeg?fv_content=true&size_mode=5', 'recycle', '0', '0', 'Cartons and TetraPak are recyclable in most of Minnesota');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Chicken Leg', 'https://previews.dropbox.com/p/thumb/AAlv3CNHXjC8jgkB50n15y77SsbLfbqxr7TzxE-4_EClCYjKFbfTUcIiRQa4AkI9CJv2UlYu93y9dzHXTTW-T_I0DED03W13Bai5Wd5SAdGwnzcpKIV_CkqQIDdJyxnT1xwU588_4GVdsq9L-9OBmjS02Gr92A36xzqhmHpC5PCLKa7D7w3vavfMGRNmZasILMYCKt3L_QZMbcApP_hHaNPxQVubxoXWu2Nr7yBjdMUZLzfimdLG4gODJ4JwXoJFXn3bUrAu00ctkU5uiZkLKSKHyyX8UNd86r9BANIiMe0x-pj0cPx6x2fplcJdT4FBBem8dDCWqJ2hYPENw2MSolqY/p.png?fv_content=true&size_mode=5', 'compost', '0', '0', 'Even meat and bones can be composted!');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Chip Bag', 'https://previews.dropbox.com/p/thumb/AAkhpJPbl-wgvG8SmGr9U5JxaUI-SOgq5yWfENgdKpv8BFa5rR3sNG58amAY3O5g8MDeg5gZjhfkRW63lpmhp9zii0AhiqVVsBHue3bLtE2bo0UT21tF__GJGclUFcH8N_wyGMMznKdyiAltqOqRdOWjhK56d-t_6x4kfT7PLvoet-phJhVspgh1U6RbVg25KmInQWxmDBdHE-CNM588TcTpzAFTQZFZSVzSsZanN0-jd4wCo9KkgkUyApOLg6-AJ2_NVDd5rFUjzLqsFjv0HJU1zOKl0884jQeKHR71BBoxUT2rSoHP3AqA10zUMhjGa9zKCw1lUF9i_PXredgdIxf9/p.png?fv_content=true&size_mode=5', 'garbage', '0', '0', 'Chip and candy wrappers are not recyclable in Minnesota, please put them in the trash');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Compostable Bowl', 'https://previews.dropbox.com/p/thumb/AAkyj0ZQ9Bn6ZtrtsWdC8Dh-ocEUYmG9Ei80NYXim9kdafarXOfzz9LZhLf5K-3nnH0NGlUhriyygr0mwq9PsQc8mBrnL6qrB92KEG3UuglECJTGuOn4IG3uSG0z2wAsjkvHMT5nLU2iYD6UMufo54VaWj0pLl0YgP7yR536iU1Kwj39RVAXnT3BU9ah1Q6-FrZwxxDDJQDdDW38VbR6beobkDUtNt0IFIucOYvHbUDasDNLKXVk28fS4sU0ROSf_8gObJeP36CODiNS08JHQip5XNLqD1j6yJKtscQh1kGdsuttQaa3Eix3dqUUILHL41B446YLGDmqbsN7BC08f-O_/p.jpeg?fv_content=true&size_mode=5', 'compost', '0', '0', 'This is a certified compostable bowl and can go into the green organics bins');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Condiment Wrappers', 'https://previews.dropbox.com/p/thumb/AAlgCsZBkRSm5xYvNBZayAEEET3FNqTD_lNrbJ5piaggvNVY9Uno_E3o8y_itWeYalNU3yZWaercz16goolvONBbOzrfTip60AYGlbx3zXzb_Z69h20sH52rd4FIfrdkBita6UCfpKD3ywwomPXvwnXQPoRsHfRxQclSHSZOoa7Wmfgj_TEVzOm6gtzxkXTquLPYNfsY29wqUoaorbwM6XoRZsW6NvQw-k05TzdCFUgPAOqKOa3Gyx1Xbt5GOsCQEmXinAM4UfA7BbaooZUzBgApd8yZGMfknow779vADTqcWuV9y3yWthQAcKdcwa21qFg-XykrjiRsmwjfas9IYZcj6nLT8Q1Mxn1NMszYVFQpwMur3Y5rzl7DZq68Gq8Ajcf0YjdGK3LaqPTavVB4f1bt6fczaGkX0N3d0p4SX5CBOg/p.jpeg?fv_content=true&size_mode=5', 'garbage', '0', '0', 'These plastics are not recyclable');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Egg Carton', 'https://previews.dropbox.com/p/thumb/AAkMNHAiTmjSkoRFsFTVGqYkdCR73Jf7EcUboXkJc1C0eqQkHEznh2_kvn8CFbJ6WDZTRWC-6zdtiy-TFzqziq3teImj0JX1srQl-_EK65Pk8cMVDuTAUuZKikMFyYs23N7lyttHm0ZJu_f7Db1sTGFG0-kjlpVkbf4AlFhGl2DkDad0Yfr5Cr13lJ2h2uuh14uGlTJTns8ZL5nBQaODLsw-SpxvslQQz6dq9-1m0M1MjArMdWwRevxBWp4jUIS6CylaOaqoMjapNIyE4-BjU06I_6A2m69IvyNp8b9-3e0FP3eUnudvr_DgC5ILjW6NjrS0Gt0n_H8P57bbOvk5Lma-qYs67SX84QBPUoV081JoVg/p.png?fv_content=true&size_mode=5', 'compost', '0', '0', 'These paper fibers are too short to be recycled, but they can be composted');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Eggshell', 'https://previews.dropbox.com/p/thumb/AAnBZkMJldx4wU97HqtcmuQfzAzuxtnKLPTllUawt9OI-omoJ-enZvlqgBftwD6oOZ_7vEsZ2CTSyYmh97FkJas39BbV1cM9ZfEuc4B2lwTBYDyeEvYu3l-ht4Ja7sfWlhnNiqVeLN-Joy0dt3nUf7ITUBnIgXiUxvFnrK3YJiFa3v_cr-KYsy6-T139lG2v0kP0mexLsrtNPfzBHVMCxhnEXALcZmKGbUYKmUDPz0vNZjvB5NwezEPbrgM_C1o-ZmQogN8__6HInEmQ3MMi4OEKmzRJyyZb6BrtF5ixsPPmIkvv2ctA8cYIZAl5UPZ5huZW7ue_6S-iwYIVBuw8-xDO/p.png?fv_content=true&size_mode=5', 'compost', '0', '0', 'All food waste can be composted');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Envelope with Window', 'https://previews.dropbox.com/p/thumb/AAmsAhp1kbgPiIAvup55bDETq-YVRoqMoz2KRvlrVjtqIsSGqH8e6lbihSBZdp_98XXKRkX9TfrKsThQIQ37vTLGU9_lwB__ajWx0_KJ5cFU3SM0WRR3SUpGsHIiuObIhZKeq4e5-bToCGflHcRtQO2trLpjBy_CC1YCcT26DId7TWhOEdm6twneuNu3Z53aqRpxS975GZ_40IlirdUsTLewg0ovxCdknmhWAB6HRbuHP_a707O0MFyUPrs61dBlXu6-N8Yf-ZA8MIYhw-Nkjh-owWtaGvddXji_B88o_bz7Bjb_JE4_Md0jVpeqydQ8pyWVRATRXFAWEhFH3txlTg0k/p.jpeg?fv_content=true&size_mode=5', 'recycle', '0', '0', 'Envelopes can be recycled, you do not even need to remove the cellophane window!');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Fast Food Wax Paper', 'https://previews.dropbox.com/p/thumb/AAm77qvi4ePL3vd_gyGnOE1ixx-xbMPr-L5HoKkFl877PvMFvzXs-NMN99tiirPQZalPbNmZIm8zdD0I3wkE-HX-MxMq7ea7PPtgF9gWU9HzdrdZ2chIGGeXoL15coIPQci4NbmqRvZ6_p5I6J7F4z_R3ZCIE9Ik-wichBk4g80yeKAaLkYZoODXXNvM1qdC_QYy5oWOdzMz6-famdgKtun-4b8vUK3PYMfcG1JeK7FOmsGHOuFUXJ3SvCTWQGZ6O_MIcKZxHVZx7csXxVnCtyjkDr0_zgQvhXBcdGoHgy0U6WBUb8-zzSrRfZgl3gV4Knyui6UQ3WSrdJBbZDys6czF/p.jpeg?fv_content=true&size_mode=5', 'garbage', '0', '0', 'Most wax paper is coated with non-recyclable and non-compostable plastics. Put them in the trash.');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Greasy Pizza Box', 'https://previews.dropbox.com/p/thumb/AAnfEQaZWG-3uXK86-TAvvk4lAAGcgm1cyLO3ygx0HDkYmnBi8RNgFfpHUvckJQmF-5x-G4FRmApP9RqqU0YMFORBJ-KfbUjtrod68Wo9LBqWcwaxAdfyDDwGK2b6LJFmbOQoYmdyh1Rfvz3hz56D3tfNfHjZeil4oZCEtJSx5GqSI7AzfHwiMcLoxPPNq-WqFY19aJTJyTdETTqQtEd7PDxJ4xZjjfOBzJa7ek2WY0BpykCZzG6xB6WdrIu6j0bnXGlqmP6kRH782G8CrtgSlDOLL6C6nQUBXcDUZfSQhjaAm5ThEar56dfGU6XTZFMRc3Vtm2EXsXiwwsb4TMKUNKb/p.png?size=1600x1200&size_mode=3', 'compost', '0', '0', 'It is too greasy to be recycled, but it can be composted!');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Hot Dog', 'https://previews.dropbox.com/p/thumb/AAkIM7-0fMnraxnXdkN9lTVns2TgjVgrmy-Cc-n18IniWYCLRIuCDEBN01htS-8W78IuEN729BB8-x1IIDDs1zBIqKUnLJbVYXlHj7171D2ORpEO2XWoMSIJOtOyBuguWPswl3Mhlerr4BdQwbqeLeqgXeY4IA1T76BTfcKTBqwgi8VXqcAa6JSIVW-33_YOUN9YwbpHMrkB2rGGTPaC57rCb1fI0F1PujHKNbnJEZI8AJXe-yGk5pO6h4Zmc2m-eu872db_unAPaO1fX_tJMsf05uZ-N8zJFwryHGnvmhH_EPzTKa0vlLLQKEMoxFXW5agMYZ0-4ZuOCw7aQBT4-0Wr/p.jpeg?fv_content=true&size_mode=5', 'compost', '0', '0', 'All food waste can be composted, even meat');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Plastic Shopping Bag', 'https://previews.dropbox.com/p/thumb/AAmXjM80Zrq5jlwkhq4REqLRZkJougztg1mHGPK1DGpvHgFZ8GSNxRx3w4yiHxzyQXGyvcAvxvbvFsCfBInGO90knN1Tr-aARuxexOuRhFpJqFGCVfDkterPmz-YswVjeVSsnAR4YDWe46I44aewngrtDY85mGDEkH4W5vJQ4pMuqE2ZkdG2CtuIonjzsj85e5y7X3Y9_NgIEGK8wFG94uhDu073vnMwabYpdaB4Xo2WqqSNF-b_wfRjYDppE8LJ2cUt_6SVN6wdmjriSpsUAeAW7cMGEg3SmsjikCLeq_7bBJpP5BNeI51GAWrtxajngLxRylDci5-nY6fABYDLNU9X/p.png?fv_content=true&size_mode=5', 'garbage', '0', '0', 'Plastic film gets wrapped around machinery at the recycling center and does not get recycled');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Toilet Paper Roll', 'https://previews.dropbox.com/p/thumb/AAkRfx9B9bTcbvNu8gI5oFRR7HMHxC9Z01Bag2JIO82HLJIvrbSJ-a6xKXTXxlONe_3NGri8FopEPbnPqeQg2WiNYyVlaZ8DCFY03NSBE8otR1rKKbRxeU0Jsy19ijw54-hqyT-SEy_VjGEooGBzM9O_x-CJV5s1Db-wIW2zzfJ5gaKXjnp3oo4LliQEbry230av7Zt3TRxh_DEcjeyhghjkdxuGKxLUQdB-f44x7g500hx_Tanyv2A9AdEAnYGuLA9roAc_YDqcLz9CH9TJFdL0a_7JZuc3strvKGABxsa-V_a2guNggRClSMO1KZlnixFFRujKo0CZ5NN-avlrZlm2/p.png?fv_content=true&size_mode=5', 'recycle', '0', '0', 'The rolls of paper towel and toilet paper can be recycled.');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Tuna Can', 'https://previews.dropbox.com/p/thumb/AAmqlwT5Ihf7_htwY9uDJvGdTKmhrDRp-60uT3LWrzxLsM3mHkbskHSOed-9Y6Ls9aXWkpifCBDDGVL5N_dFEoD3M9Gec7TSC19jaU5GwkQuEM0RcV4_fd56TFD2tPvdEywvRZ0rwWbDj8Go4mWxTylgHK-QZmOBlHv1vKBrtU_z6au_ju4Hqmmlr_JyqO17JgXlWNV4SnmMbUCBafWdlE-z7glKImYWYcG0Z9L5vIJoCaWeuxuRdTeCRH5_xcxijgSKpEyvpMNrLes0MXWIfRobvGzurM48wmdXkzr-7Wns709UEpTtWgxWqlYDCMMqShDRUdPxJXWjJJQFbwdNj2_o/p.jpeg?fv_content=true&size_mode=5', 'recycle', '0', '0', 'Steel and tin cans are highly recyclable and valuable');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Plastic Cutlery', 'https://previews.dropbox.com/p/thumb/AAnmdlcEA3cW62j1z4p8KnGm0LidMZXNoqWR59_55ItwmrP_T6Yz7mzYUgsxhgJJfgQwx6GCn7OXPgFeYimZT-Ml77fpWskXvpjPygcbywQuc5hhm2ooQLmRhXxfsqG_CPZJOzsyOwOe4VOdd7eJJJcp5TjoMr5huPyFyv61vLezDKNHSwJ2qepwXytYBkCgVz2l60Q8LJgpdapnNeQ6m-ISa-CuaFVEyCw_T_Gr9GaB4VgmlxbstmQfbL50CT-hFhKiAyjeRMK16mBoTfxbLxsPpfD2YN2Di20U_bGdRiMEaDCwNhYk4PZ1HOnKe43cNew5DLv0K4E5yuHy6RYvzaQv/p.jpeg?fv_content=true&size_mode=5', 'garbage', '0', '0', 'Plastic cutlery is too small to be recycled put it in the compost');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Lined Paper Plate', 'https://previews.dropbox.com/p/thumb/AAlwwBLtUJjTL98T-SiiMHc4ZUQ2VKVv5jYeJVqKp_KfELbx8XQspDFtizRaSiaOwpylrZ_gZbX9C4XVvVyEJE5xnBVx2aEFoqw3FSh_C3EsP7z92TxmiE0N2v77pv3jeSvvBA9D6cBIldEWGUNSDVoJOoLJI6-mB5efMHQHUtw_IUz_ikS4oWX3nBaloIfxmOJf-S-g0K2_N3D-DU6AsA3uo-6qB-HvfVOQ61xm6mvPnOEpCwK1e35sputR2mHVBqpcFcG0wRimqgKkh765fO-ztqQSLUyYIOJ98iVWh3t4MDd-jipOn4t6KvEzCstj7A3mHijPkRcd1O1FbnjNlPRF/p.jpeg?fv_content=true&size_mode=5', 'garbage', '0', '0', 'The plastic liner on this plate makes it non-compostable. Put it in the trash.');

INSERT into "item"
  ("name", "url", "receptacle", "correct_count", "number_of_instances", "item_text")
VALUES
  ('Ice Cream Container', 'https://previews.dropbox.com/p/thumb/AAmsam0GtOU_E_g-RJIHWvRXBF83hHivuwi_b33RdSHpcXraryEkVk0BbLlOjAfu4tzJgqnNXhJTqQa017IiCPGEduQT3e_SsNuFrmJK1kkTDQBixRPZ3aPSDz1PDUIsCic0Syyme1YmhcfOug2jAXBBz2U3UusyutYS84FvcMHB-aVqn0r_PBP9wxJ2e1p-QXJRxFxTr4TrPsbXviXUipj1SWflm8cE2i6JoihMbgCzi4zaoX5uz2ic9F0plhZtf1tZBi5f5ftZUqjRZ0LoYpdk11Y5Vq-hUwVj9v_6ZSdF6csOa1MabFdetFhXK8Vy7CCyXIricSfLYCamsLUYOQdf/p.jpeg?fv_content=true&size_mode=5', 'garbage', '0', '0', 'Just like fast food cups, paper ice cream containers have a plastic barrier that makes them very difficult to recycle');