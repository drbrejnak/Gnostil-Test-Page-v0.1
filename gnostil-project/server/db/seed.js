const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://postgres:@localhost/test');

const seed = async () => {
    console.log('Seeding database...');
    try {
        await client.connect();
        await client.query(`
            DROP TABLE IF EXISTS
                character_hand,
                character_deck,
                techniques,
                characters,
                maneuvers,
                users
            CASCADE;
        `);

        await client.query(`
            BEGIN;

            CREATE TABLE IF NOT EXISTS character_deck
            (
                id serial NOT NULL,
                deck_id uuid NOT NULL,
                maneuver_id integer,
                tech_id integer,
                CONSTRAINT character_deck_pkey PRIMARY KEY (id),
                CONSTRAINT unique_deck_maneuver UNIQUE (deck_id, maneuver_id)
            );

            CREATE TABLE IF NOT EXISTS character_hand
            (
                id serial NOT NULL,
                hand_id uuid NOT NULL,
                deck_id uuid NOT NULL,
                maneuver_id integer,
                "position" integer NOT NULL,
                tech_id integer,
                CONSTRAINT unique_hand_id_maneuver_id UNIQUE (hand_id, maneuver_id),
                CONSTRAINT unique_hand_id_technique_id UNIQUE (hand_id, tech_id)
            );

            CREATE TABLE IF NOT EXISTS characters
            (
                id uuid NOT NULL,
                user_id uuid NOT NULL,
                deck_id uuid NOT NULL,
                hand_id uuid NOT NULL,
                char_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
                CONSTRAINT characters_pkey PRIMARY KEY (id),
                CONSTRAINT characters_deck_id_key UNIQUE (deck_id),
                CONSTRAINT characters_hand_id_key UNIQUE (hand_id),
                CONSTRAINT unique_user_id_char_name UNIQUE (user_id, char_name)
            );

            CREATE TABLE IF NOT EXISTS maneuvers
            (
                id serial NOT NULL,
                maneuver_name text COLLATE pg_catalog."default",
                discipline text COLLATE pg_catalog."default",
                maneuver_type text COLLATE pg_catalog."default",
                description text COLLATE pg_catalog."default",
                ability text COLLATE pg_catalog."default",
                toll integer,
                yield integer,
                weight text COLLATE pg_catalog."default",
                paradigm text COLLATE pg_catalog."default",
                CONSTRAINT maneuvers_pkey PRIMARY KEY (id)
            );

            CREATE TABLE IF NOT EXISTS techniques
            (
                hand_id uuid NOT NULL,
                deck_id uuid NOT NULL,
                tech_name text COLLATE pg_catalog."default" NOT NULL,
                discipline text COLLATE pg_catalog."default" NOT NULL,
                tech_type text COLLATE pg_catalog."default" NOT NULL,
                tech_description text COLLATE pg_catalog."default",
                tech_ability text COLLATE pg_catalog."default" NOT NULL,
                toll integer NOT NULL,
                yield integer NOT NULL,
                weight text COLLATE pg_catalog."default" NOT NULL,
                paradigm text COLLATE pg_catalog."default" NOT NULL,
                tech_id integer NOT NULL,
                inputs integer NOT NULL,
                og_disciplines text COLLATE pg_catalog."default" NOT NULL,
                CONSTRAINT techniques_pkey PRIMARY KEY (tech_id)
            );

            CREATE TABLE IF NOT EXISTS users
            (
                id uuid NOT NULL,
                username character varying(20) COLLATE pg_catalog."default" NOT NULL,
                password character varying(255) COLLATE pg_catalog."default" NOT NULL,
                CONSTRAINT users_pkey PRIMARY KEY (id),
                CONSTRAINT users_username_key UNIQUE (username)
            );

            ALTER TABLE IF EXISTS character_deck
                ADD CONSTRAINT character_deck_deck_id_fkey FOREIGN KEY (deck_id)
                REFERENCES characters (deck_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION;


            ALTER TABLE IF EXISTS character_deck
                ADD CONSTRAINT character_deck_maneuver_id_fkey FOREIGN KEY (maneuver_id)
                REFERENCES maneuvers (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION;


            ALTER TABLE IF EXISTS character_deck
                ADD CONSTRAINT character_deck_tech_id_fkey FOREIGN KEY (tech_id)
                REFERENCES techniques (tech_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
                NOT VALID;


            ALTER TABLE IF EXISTS character_hand
                ADD CONSTRAINT character_hand_deck_id_fkey FOREIGN KEY (deck_id)
                REFERENCES characters (deck_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION;


            ALTER TABLE IF EXISTS character_hand
                ADD CONSTRAINT character_hand_hand_id_fkey FOREIGN KEY (hand_id)
                REFERENCES characters (hand_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION;


            ALTER TABLE IF EXISTS characters
                ADD CONSTRAINT characters_user_id_fkey FOREIGN KEY (user_id)
                REFERENCES users (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION;


            ALTER TABLE IF EXISTS techniques
                ADD CONSTRAINT techniques_deck_id_fkey FOREIGN KEY (deck_id)
                REFERENCES characters (deck_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION;


            ALTER TABLE IF EXISTS techniques
                ADD CONSTRAINT techniques_hand_id_fkey FOREIGN KEY (hand_id)
                REFERENCES characters (hand_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION;

            END;
        `);

        await client.query(`
            BEGIN;

            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Aside','Aiontropier','Inciting','I can make flavor text here later; it''s not as important as the effect and the structure.','Gain Valor on next attack but the next attack has Valor on you. Impeded.',1,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Repose','Aiontropier','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Increase Reach of attack?',5,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Protraction','Aiontropier','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Increase Reach of attack?',4,0,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Inevitability Altar','Aiontropier','Reaction','I can make flavor text here later; it''s not as important as the effect and the structure.','Die System. Gain Immersed until the end of next turn. Spend Die for Sissyphus. Ritual for Mod.',9,0,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Counter','Aiontropier','Reaction','I can make flavor text here later; it''s not as important as the effect and the structure.','On hit, roll higher to deny damage and deal small dmg + mod.',0,1,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Inferno','Elementalist','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Fire Damage, Cone. Causes Afeared.',10,0,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Infest','Elementalist','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Wither Damage, Blast. Causes Strained.',1,0,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Squall','Elementalist','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Nimbus Damage, Line. Causes Encumbered.',6,0,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Elemental Alter','Elementalist','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Change Damage Type to either Fire, Wither, or Nimbus + Damage. Die System.',0,8,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Shape Charge','Elementalist','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Change AoE AND Damage to either Cone (Fire), Blast (Wither), or Line (Nimbus).',0,3,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Ambit Wash','Euclidinst','Inciting','I can make flavor text here later; it''s not as important as the effect and the structure.','Create an AoE until the end of your next turn. Ranged Attacks that originate from outside the space have Dread to hit and can’t benefit from Valor. Ritual for Melee instead.',5,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Reverse Riptide','Euclidinst','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Flight. Ritual for Pushback instead.',0,10,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Infinite Division','Euclidinst','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','PCs in Aura 1 become Burrowed until the end of the turn.',0,7,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Roiling Altar','Euclidinst','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Move all targets X spaces in a direction of choice on hit. Die System',0,1,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Recant','Euclidinst','Reaction','I can make flavor text here later; it''s not as important as the effect and the structure.','Target reroll d20. (Make it so it makes you trade places and targeting)',5,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Pin Down','Fleethand Jaeger','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Charge Attack. Immobilize on hit for a short while.',5,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Sky Blot','Fleethand Jaeger','Inciting','I can make flavor text here later; it''s not as important as the effect and the structure.','Choose  1 Space. Pinaka. Ritual for Blast 1.',10,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Coin Shot','Fleethand Jaeger','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Crescent Attack. Ritual for Damage.',0,7,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Power Shot','Fleethand Jaeger','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Input w/out Charge gains Charge and extra dmg.',0,2,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Manifold Adapt','Fleethand Jaeger','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Multiple Targets. Still consumes Ammo, if applicable. Die System.',0,9,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Unravel','Flesh Shaper','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','An attack that has Sunder X but you gain Stress.',8,0,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Mimic','Flesh Shaper','Aura','I can make flavor text here later; it''s not as important as the effect and the structure.','Become a creature from the Monster Manual? Gain 1 Stress every Round that you are?',0,5,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Creeping Vines','Flesh Shaper','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Attack deals knockback towards you. Ritual for Recoil towards target instead.',0,6,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Self Alter','Flesh Shaper','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Make one of your body stats (Str or Dex) 10 (Max is 12) for the Main Input. Die System.',0,4,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Pack Tactics','Flesh Shaper','Reaction','I can make flavor text here later; it''s not as important as the effect and the structure.','When an enemy in yours and an allies reach starts their turn.',5,0,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Phantom Flame','Geist Called','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Nimbus Damage, Arc. Causes Afeared.',4,0,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Shallowbreath','Geist Called','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Wither Damage, Beam. Causes Encumbered.',3,0,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Illburn','Geist Called','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Fire Damage, Wave. Causes Strained.',2,0,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Vigor Mortis','Geist Called','Inciting','I can make flavor text here later; it''s not as important as the effect and the structure.','A PC in Aura 1 clears Conditions on kill. Ritual for Embolden.',9,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Possession Altar','Geist Called','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Summon a servant if you kill a target or target a Wreck (Dreg)? Die System (literally, haha).',0,8,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Deathscry','Gloommantle','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','An attack that gains Vorpal X. If you miss you gain Stress.',10,0,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Stalk','Gloommantle','Aura','I can make flavor text here later; it''s not as important as the effect and the structure.','(Sneak Attack Hide) You become Burrowed. When you make an attack, lose burrowed and deal X+ Damage. Then take an equal amount of stress, up to 6.',0,6,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Unseen Blade','Gloommantle','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Attack can’t be reacted to. Ritual for Homing.',0,8,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Impromptu Adapt','Gloommantle','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Make one of your body stats (Int or Wis) 10 (Max is 12) for the next Main Input. Die system.',0,4,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Backstab','Gloommantle','Reaction','I can make flavor text here later; it''s not as important as the effect and the structure.','When an enemy in Reach starts their turn adjacent to no allies.',5,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('YOMIH','Ironhanded','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Combo Attack. Growing Wave.',1,0,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Entangle','Ironhanded','Inciting','I can make flavor text here later; it''s not as important as the effect and the structure.','Covering Fire. Ritual for one extra target.',7,0,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Gut Blow','Ironhanded','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Add +1 Dread and dmg. Ritual for Curse.',0,3,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Mix Up','Ironhanded','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Input w/ Charge completes charge faster but for less dmg.',0,2,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Pummel Adept','Ironhanded','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Extra damage. Still consumes Ammo, is applicable. Die System.',0,10,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Shockwave','Metapsychiral','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Force Damage, Wave. Causes Staggered.',7,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Surge','Metapsychiral','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Bloom Damage, Beam. Causes Impeded.',5,0,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Bolt','Metapsychiral','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Lighting Damage, Arc. Causes Dazed.',9,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Ailment Alter','Metapsychiral','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Change Damage Type to either Force, Bloom, or Lighting + Damage. Die System.',0,3,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Mold Power','Metapsychiral','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Change AoE AND Damage to either Wave (Force), Beam (Bloom), or Arc (Lighting).',0,9,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Maim','Noble’s Nail','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Ritual is Combo. Bludgeoning for Emboldened, Slashing forImmersed, and Piercing for Morale.',9,0,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Justified Cruelty','Noble’s Nail','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Your Infamy Score is treated as an Honor Bonus for the Input.',0,2,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Execution','Noble’s Nail','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Die System. Have to target you.  Reaction to turn start. Flare 1 on enemy. Have to target.',0,10,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Cheap Shot','Noble’s Nail','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Until the end of the turn, gain 3 Extra Intent. Dazed + Stress on next turn.',0,3,'Heavy','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Taunt Adapt','Noble’s Nail','Reaction','I can make flavor text here later; it''s not as important as the effect and the structure.','Change damage from Bludgeoning, Piercing, or Slashing to one of the other two.',2,0,'Light','Infamous');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('X-Strike','Paragon Populi','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Ritual is Charge. Sunder for Emboldened, Vorpal for Immersed, and Impale for Morale.',2,0,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Noble Vindication','Paragon Populi','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Your Honor Score is treated as an Infamy Bonus for the Input.',0,8,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Sure Strike','Paragon Populi','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','On hit, instead of rolling damage you deal the average.',0,1,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Called Shot','Paragon Populi','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Change attack trait from Vorpal, Sunder, or Impale into one of the other two.',0,2,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Challenge Adept','Paragon Populi','Reaction','I can make flavor text here later; it''s not as important as the effect and the structure.','Die System. Bonus to hit you. Penalty to hit others. Aura 1. Until end of next turn, Bonus to get hit.',2,0,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Shield Plant','Shieldbearer','Inciting','I can make flavor text here later; it''s not as important as the effect and the structure.','Get impeded but gain and become Hard Cover until the start of next turn. Aura 1.',8,0,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Bash','Shieldbearer','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Knockback. Ritual for + Dazed?',0,9,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Aegis','Shieldbearer','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Guard X.',0,2,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Phalanx Adept','Shieldbearer','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Allies near you gain X armor. Die System',0,2,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Interceded','Shieldbearer','Reaction','I can make flavor text here later; it''s not as important as the effect and the structure.','When an adjacent ally is targeted, become the new target and roll d20. If higher than attack the attack automatically misses. If lower, take damage. Ritual for more Focus and make it Ranged attacks.',3,0,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Monsoon','Wild Whisperer','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Lighting Damage, Line. Causes Impeded.',7,0,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Overflow','Wild Whisperer','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Bloom Damage, Blast. Causes Staggered.',9,0,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Earthquake','Wild Whisperer','Attack','I can make flavor text here later; it''s not as important as the effect and the structure.','Force Damage, Cone. Causes Dazed.',6,0,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Naturalize','Wild Whisperer','Inciting','I can make flavor text here later; it''s not as important as the effect and the structure.','Clear Conditions and Aura of target. Ritual for Immersed.',7,0,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Omission Alter','Wild Whisperer','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Exile a Target Creature (Burrowed) for X Round? Die System.',0,7,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Limit Break','Yieldless Goliath','Inciting','I can make flavor text here later; it''s not as important as the effect and the structure.','Gain 1d6 True damage. Next time you take damage, take 1d6 extra True Dmg. 1/Turn free Dash.',8,0,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Frenzy','Yieldless Goliath','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Attack gains Throw 5. If already Throw, gains damage in addition.',0,5,'Heavy','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Spike','Yieldless Goliath','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','Die System. Gain Embolden until end of the next turn. Make check’s roll a total of 10. Ritual for Reaction.',0,4,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Instinct Adept','Yieldless Goliath','Modify','I can make flavor text here later; it''s not as important as the effect and the structure.','On hit, deal big damage + mod without attack roll.',0,9,'Light','Honorable');
            INSERT INTO maneuvers(maneuver_name,discipline,maneuver_type,description,ability,toll,yield,weight,paradigm) VALUES ('Trade','Yieldless Goliath','Reaction','I can make flavor text here later; it''s not as important as the effect and the structure.','At the end of Round, Gain additional turn w/ half Intent, minimum 1. Dazed + Stress on next standard turn.',1,0,'Light','Infamous');


            END;
        `);

        console.log('Database seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        throw error;  
    }
    finally {
        await client.end();
    }
}

if (require.main === module) {
    seed()
        .catch(err => {
            console.error('Error during seeding:', err);
            process.exit(1);
        });
}