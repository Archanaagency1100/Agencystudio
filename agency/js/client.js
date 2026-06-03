
const clients = [
    // singers
    { client_name: "Sunidhi Chauhan", client_logo: "image/clients/singers/sunidhi.png", search_text: "singer singers Sunidhi music " },
    { client_name: "Jasleen Royal", client_logo: "image/clients/singers/jaslin.png", search_text: "singer singers jasleenn royal music" },
    { client_name: "KK", client_logo: "image/clients/singers/kk.png", search_text: "singer singers KK music" },
    { client_name: "Neha Kakkar", client_logo: "image/clients/singers/neha-kakker.png", search_text: "singer singers neha kakkar music" },
    { client_name: "Manasi Scott", client_logo: "image/clients/singers/manasi-scott.png", search_text: "singer singers manasi scott music" },
    { client_name: "Shibani kashyap", client_logo: "image/clients/singers/shibani-kashyap.png", search_text: "singer singers shibani kashyap music" },
    { client_name: "Sajid Wajid", client_logo: "image/clients/singers/sajid-wajid.png", search_text: "singer singers sajid wajid music" },
    { client_name: "Richa Sharma", client_logo: "image/clients/singers/richa-sharma.png", search_text: "singer singers richa sharma music" },
    { client_name: "Jasbir Jassi", client_logo: "image/clients/singers/jasbir-jassi.png", search_text: "singer singers jasbir jassi music" },
    
    // EMCEE
    { client_name: "Vandana Vadhera", client_logo: "image/clients/singers/vandana-vadhera.png", search_text: "emcee host anchor vandana vadhera" },

    // bands
    { client_name: "Bindaas Boys", client_logo: "image/clients/bands/bindaas-boys.png", search_text: "Bands bindaas boys" },
    { client_name: "Band of boys", client_logo: "image/clients/bands/band-of-boys.png", search_text: "Bands bindaas boys" },
    { client_name: "Band of Doon", client_logo: "image/clients/bands/band-0f-doon.png", search_text: "Bands bindaas boys" },

    // comedians
    { client_name: "Ashmita Theatre", client_logo: "image/clients/comedians/ashmita-theatre.png", search_text: "Comedians ashmita theatre" },
    { client_name: "Kapil Sharma", client_logo: "image/clients/comedians/kapil.png", search_text: "Comedians Kapil Sharma" },
    { client_name: "Deepak Raja", client_logo: "image/clients/comedians/deepak-raja.png", search_text: "Comedians deepak raja" },
    { client_name: "Naveen Prabhakar", client_logo: "image/clients/comedians/naveen.png", search_text: "Comedians naveen raja" },
    { client_name: "Ahsaan Qureshi", client_logo: "image/clients/comedians/ahsaan.png", search_text: "Comedians ahsaan qureshi" },
    { client_name: "Raja Rencho", client_logo: "image/clients/comedians/raja-rencho.png", search_text: "Comedians raja rencho" },
    { client_name: "Pratap Fauzdar", client_logo: "image/clients/comedians/pratap.png", search_text: "Comedians ashmita theatre" },

    // Arts
    { client_name: "Champa Tree", client_logo: "image/clients/art/champa-tree.png", search_text: "Arts champa tree" },
    { client_name: "Delhi College of Arts", client_logo: "image/clients/art/dca.png", search_text: "Arts dca delhi college of arts" },
    { client_name: "A Four A", client_logo: "image/clients/art/a4a.png", search_text: "Arts a4a" },
    // { client_name: "Champa Tree", client_logo: "image/clients/art/champa-tree.png", search_text: "art champa tree" },
    // { client_name: "Champa Tree", client_logo: "image/clients/art/champa-tree.png", search_text: "art champa tree" },

    // TV Channels
    { client_name: "Aaj Tak", client_logo: "image/client/aajtak.png", search_text: "aaj tak news TV Channels news tv" },
    { client_name: "PTC News", client_logo: "image/clients/channels/ptc-news.png", search_text: "PTC news TV Channels news tv" },
    { client_name: "Channel V", client_logo: "image/clients/channels/channel-v.png", search_text: "PTC news TV Channels news tv" },
    { client_name: "CNN IBN", client_logo: "image/clients/channels/cnn-ibn.png", search_text: "cnn ibn TV Channels news tv" },
    { client_name: "ETC Punjabi", client_logo: "image/clients/channels/etc-punjabi.png", search_text: "etc punjabi TV Channels news tv" },
    { client_name: "Sahara TV", client_logo: "image/clients/channels/sahara-tv.png", search_text: "sahara tv TV Channels news tv" },
    { client_name: "Star TV", client_logo: "image/clients/channels/star-v.png", search_text: "PTC news TV Channels news tv" },


    // Media 
    { client_name: "India Today", client_logo: "image/client/indiatoday.png", search_text: "india today news Media Co's news paper" },
    { client_name: "Hindustan Times", client_logo: "image/client/hindustaantimes.png", search_text: "hindustan times news Media Co's news paper" },
    { client_name: "Amar Ujala", client_logo: "image/clients/media/amar-ujala.png", search_text: "Amar Ujala news Media Co's news paper" },

    // actor
    { client_name: "Ishwak Singh", client_logo: "image/clients/actor/ishwak-singh.png", search_text: "Actors ishwak singh" },
    { client_name: "Armaan Khera", client_logo: "image/clients/actor/armaan-khera.png", search_text: "Actors armaan khera" },
    { client_name: "Gunjan Utreja", client_logo: "image/clients/actor/gunjan-utreja.png", search_text: "Actors gunjan utreja" },
    { client_name: "Mukesh Bhatt", client_logo: "image/clients/actor/mukesh-bhatt.png", search_text: "Actors mukesh bhatt" },
    { client_name: "Kiran Dubey", client_logo: "image/clients/actor/kiran-dubey.png", search_text: "Actors kiran dubey" },

    // hospitality
    
    { client_name: "Artisans Salon", client_logo: "image/clients/hospitality/artisans.png", search_text: "hospitality Hospitality salon hotel artisans" },
    { client_name: "Omega Hotel", client_logo: "image/clients/hospitality/omega.png", search_text: "hospitality Hospitality omega hotels hotel" },
    { client_name: "Swad Sanskriti", client_logo: "image/clients/hospitality/swad-sanskriti.png", search_text: "hospitality Hospitality swad sanskriti" },
    { client_name: "Associate Hotel", client_logo: "image/clients/hospitality/associate-hotels.png", search_text: "hospitality Hospitality associate hotels" },
    { client_name: "Travtips", client_logo: "image/clients/hospitality/travtips.png", search_text: "hospitality Hospitality travtips" },
    { client_name: "Aamby Valley City", client_logo: "image/clients/hospitality/aambey-valley.png", search_text: "hospitality Hospitality aamby valley city" },

    // Clothing
    
    { client_name: "Ayana", client_logo: "image/clients/clothing/ayana.png", search_text: "Clothing Ayayna" },

    // lifestyle

    { client_name: "Badasaab", client_logo: "image/clients/lifestyle/badasaab.png", search_text: "Lifestyle tailor badasaab"},
    { client_name: "Borgeaud Watches", client_logo: "image/clients/lifestyle/borgeaud-watches.png", search_text: " Lifestyle watche borgeaud"},
    { client_name: "Kitty Dhupar", client_logo: "image/clients/lifestyle/kitty-dhupar.png", search_text: "Lifestyle tailor Kitty Dhupar"},
    { client_name: "Luxury League", client_logo: "image/clients/lifestyle/luxury-league.png", search_text: "Lifestyle luxury league"},
    { client_name: "Rama Watch", client_logo: "image/clients/lifestyle/rama-watch.png", search_text: " Lifestyle rama watch"},

    // Govt Projects
    { client_name: "AMCDRR", client_logo: "image/clients/govt/amcdrr.png", search_text: "Govt Projects AMCDRR"},
    { client_name: "Archaeological Survey Of India", client_logo: "image/clients/govt/archaeological-survey-of-india.png", search_text: "Govt Projects Archaeological Survey Of India"},
    { client_name: "ICCR", client_logo: "image/clients/govt/iccr.png", search_text: "Govt Projects iccr"},
    { client_name: "Indian Navy", client_logo: "image/client/indian-navy.png", search_text: "Govt Projects Indian Navy"},
    { client_name: "SurajKund", client_logo: "image/clients/govt/surajkund.png", search_text: "Govt Projects surajkund"},
    { client_name: "Vehicle Factory Jabalpur", client_logo: "image/clients/govt/vehicle-factory-jabalpur.png", search_text: "Govt Projects Vehicle Factory Jabalpur"},
    { client_name: "Himachal Pradesh GOVT", client_logo: "image/client/himachal-pradesh-govt.png", search_text: "Govt Projects Himachal Pradesh GOVT"},
    { client_name: "Indian Army", client_logo: "image/client/indianarmy.png", search_text: "Govt Projects indian army"},

    // food

    { client_name: "KRMP Oil", client_logo: "image/clients/food/krmp.png", search_text: "FMCG/Food krmp oil"},
    { client_name: "Livvel", client_logo: "image/clients/food/livvel.png", search_text: "FMCG/Food livvel"},
    { client_name: "Parle Agro", client_logo: "image/clients/food/parleagro.png", search_text: "FMCG/Food Parle Agro Frotti"},
    { client_name: "Haldiram", client_logo: "image/clients/food/haldiram.png", search_text: "FMCG/Food haldiram"},
    { client_name: "Shax N Cafe", client_logo: "image/clients/food/shax-n-cafe.png", search_text: "FMCG/Food haldiram"},

    // Event managements
    { client_name: "Touchwood", client_logo: "image/client/touchwood.png", search_text: "Event Management touchwood event"},
    { client_name: "The Gourmet Fest", client_logo: "image/client/tgf.png", search_text: "Event Management tgf the gourmet fest event"},
    { client_name: "A Square Events & Exhibition", client_logo: "image/clients/event-management/a-square.png", search_text: "Event Management a square events and management"},
    { client_name: "E Factor", client_logo: "image/clients/event-management/e-factor.png", search_text: "Event Management e-factor"},
    { client_name: "Events Maniac", client_logo: "image/clients/event-management/events-maniac.png", search_text: "Event Management events maniac"},
    { client_name: "Expro Events", client_logo: "image/clients/event-management/expro.png", search_text: "Event Management  expro events"},
    { client_name: "Ferns N Petals", client_logo: "image/clients/event-management/ferns-n-petals.png", search_text: "Event Management ferns n petals"},
    { client_name: "Grace Entertainers", client_logo: "image/clients/event-management/grace-intertainer.png", search_text: "Event Management the gourmet fest event"},
    { client_name: "Garments Technology Expo", client_logo: "image/clients/event-management/gte.png", search_text: "Event Management  gte garment technology expo"},
    { client_name: "Hospital Infection Society", client_logo: "image/clients/event-management/hisicon.png", search_text: "Event Management hospital infection society"},
    { client_name: "KReal Events", client_logo: "image/clients/event-management/krel.png", search_text: "Event Management kreal events"},
    { client_name: "Made In Heaven", client_logo: "image/clients/event-management/made-in-heaven.png", search_text: "Event Management made in heaven"},
    { client_name: "marquee One", client_logo: "image/clients/event-management/marqueeone.png", search_text: "Event Management marquee one"},
    { client_name: "Master Sound", client_logo: "image/clients/event-management/master-sound.png", search_text: "Event Management Master Sound"},    
    { client_name: "MH One", client_logo: "image/clients/event-management/mh-one.png", search_text: "Event Management mh one"},
    { client_name: "Kaleidoscope", client_logo: "image/clients/event-management/kaliedoscope.png", search_text: "Event Management kaleidoscope"},    
    { client_name: "Mallu Farms", client_logo: "image/clients/event-management/mallu-farms.png", search_text: "Event Management mallu farms"},
    { client_name: "Mileage Events", client_logo: "image/clients/event-management/mileage.png", search_text: "Event Management mileage events"},
    { client_name: "Purple Events", client_logo: "image/clients/event-management/purple.png", search_text: "Event Management purple events"},
    { client_name: "Sutraa Event Carriers", client_logo: "image/clients/event-management/sutra.png", search_text: "Event Management sutraa event carriers"},
    { client_name: "The Solutions Unlimited", client_logo: "image/clients/event-management/the-solution.png", search_text: "Event Management the solutions unlimited"},
    { client_name: "Triveni Events", client_logo: "image/clients/event-management/triveni-events.png", search_text: "Event Management triveni events"},
    { client_name: "Unwind Communications", client_logo: "image/clients/event-management/unwind.png", search_text: "Event Management unwind communications"},
    { client_name: "Vibyor", client_logo: "image/clients/event-management/vibyor.png", search_text: "Event Management vibyor"},
    { client_name: "Vowels Entertainment", client_logo: "image/clients/event-management/vowels.png", search_text: "Event Management vowels entertainment"},
    
    // Fitness
    { client_name: "Cutomised Protein", client_logo: "image/clients/fitness/customised-protien.png", search_text: "Fitness customised protein"},
    { client_name: "Catpharma", client_logo: "image/clients/fitness/catpharma.png", search_text: "Fitness catpharma protein"},
    { client_name: "Team Boss Online Coaching", client_logo: "image/clients/fitness/tboc.png", search_text: "Fitness tboc team boss online coaching harry sandhu"},
    { client_name: "YOGA", client_logo: "image/clients/fitness/yoga.png", search_text: "Fitness yoga yyooggaa"},
    { client_name: "Wholistic Fitness", client_logo: "image/clients/fitness/wholistic-fitness.png", search_text: "Fitness wholistic fitness"},
    { client_name: "Manoj Kumar", client_logo: "image/clients/fitness/manoj-kumar.png", search_text: "Fitness Manoj Kumar"},
    { client_name: "Boss Classic", client_logo: "image/clients/fitness/bossclassic.png", search_text: "Fitness boss classic"},

    // Corporate
    { client_name: "Dr. Lal Pathlabs", client_logo: "image/clients/corporate/dr.pathlab.png", search_text: "corporates dr. lal pathlabs "},
    { client_name: "T Series", client_logo: "image/clients/corporate/t-series.png", search_text: "corporates t series "},
    { client_name: "Bajaj Motors", client_logo: "image/clients/corporate/bajaj-motors.png", search_text: "corporates bajaj motors"},
    { client_name: "Caltex", client_logo: "image/clients/corporate/caltex.png", search_text: "corporates Caltex "},
    { client_name: "Lakme", client_logo: "image/clients/corporate/lakme.png", search_text: "corporates lakme "},
    { client_name: "Bestlife", client_logo: "image/clients/corporate/bestlife.png", search_text: "corporates bestlife "},
    { client_name: "EO Delhi", client_logo: "image/clients/corporate/eo-delhi.png", search_text: "corporates divine"},
    { client_name: "Hilti", client_logo: "image/clients/corporate/hilti.png", search_text: "corporates hilti "},
    { client_name: "Formula One", client_logo: "image/clients/corporate/formulaone.png", search_text: "corporates formula one"},
    { client_name: "Formula One", client_logo: "image/clients/corporate/franchise-india.png", search_text: "corporates Formula One "},
    { client_name: "Fashion TV", client_logo: "image/clients/corporate/ftv.png", search_text: "coporates fashion tv ftv"},
    { client_name: "Lumax", client_logo: "image/clients/corporate/lumax.png", search_text: "corporates lumax "},
    { client_name: "Mohan Meakins", client_logo: "image/clients/corporate/mohan-meakin.png", search_text: "corporates mohan meakins"},
    { client_name: "Pure Root", client_logo: "image/clients/corporate/pure-root.png", search_text: "corporates pure root"},
    { client_name: "Omaxe", client_logo: "image/clients/corporate/omaxe.png", search_text: "corporates omaxe"},
    { client_name: "Acqua Viva", client_logo: "image/clients/corporate/acqua-viva.png", search_text: "corporates acqua viva"},
    { client_name: "Karamsar Technology", client_logo: "image/clients/corporate/karamsar-technology.png", search_text: "corporates karamsar technology"},
    { client_name: "Del Rio", client_logo: "image/clients/corporate/del-rio.png", search_text: "corporates del rio"},
    { client_name: "Delhi Online Printing", client_logo: "image/clients/corporate/delhi-online.png", search_text: "corporates delhi online printing"},
    { client_name: "Bathline", client_logo: "image/clients/corporate/bathline.png", search_text: "corporates bathline"},
    { client_name: "Divine ", client_logo: "image/clients/corporate/divine.png", search_text: "corporates divine"},
    { client_name: "Del Rio", client_logo: "image/clients/corporate/del-rio.png", search_text: "corporates del rio"},
    { client_name: "Bottoms Up", client_logo: "image/clients/corporate/bottomsup.png", search_text: "corporates Bottoms Up"},
    { client_name: "Gmak", client_logo: "image/clients/corporate/gmak.png", search_text: "corporates acqua gmak"},
    { client_name: "GS Oberio & Co.", client_logo: "image/clients/corporate/gs-oberio.png", search_text: "corporates gs oberio"},
    { client_name: "International Placewell Consultants", client_logo: "image/clients/corporate/ipc.png", search_text: "corporates ipc international placewell consultants"},
    { client_name: "Karamsar Technology", client_logo: "image/clients/corporate/karamsar-technology.png", search_text: "corporates karamsar technology"},
    { client_name: "Karina", client_logo: "image/clients/corporate/karina.png", search_text: "corporates karina"},
    { client_name: "The New Indian Village", client_logo: "image/clients/corporate/new-indian-village.png", search_text: "corporates the new indian village"},
    { client_name: "Perfect Bread", client_logo: "image/clients/corporate/perfect-bread.png", search_text: "corporates perfect bread"},
    { client_name: "Pr In India", client_logo: "image/clients/corporate/pr-in-india.png", search_text: "corporates pr in indian"},
    { client_name: "Sacred Water Shanti", client_logo: "image/clients/corporate/sacred-water-shanti.png", search_text: "corporates sacred water shanti"},
    { client_name: "Sage Export", client_logo: "image/clients/corporate/sage-export.png", search_text: "corporates sage export"},
    { client_name: "Space Sense", client_logo: "image/clients/corporate/space-sense.png", search_text: "corporates space sense"},
    { client_name: "SRC Aviation", client_logo: "image/clients/corporate/src-aviation.png", search_text: "corporates src aviation"},
    { client_name: "Words n Songs", client_logo: "image/clients/corporate/words-n-nsong.png", search_text: "corporates sage export"},
    { client_name: "Pure Root", client_logo: "image/clients/corporate/pure-root.png", search_text: "corporates sage export"},
    { client_name: "Apao", client_logo: "image/clients/corporate/apao.png", search_text: "corporates apao"},
    { client_name: "Magnetic Logistic", client_logo: "image/clients/corporate/magnetic.png", search_text: "corporates magnetic logistic"},
    { client_name: "Singh Modelers", client_logo: "image/clients/corporate/singh-modelers.png", search_text: "corporates singh modelers"},

    // College
    { client_name: "St. Stephens College", client_logo: "image/clients/college/sant-stepehn.png", search_text: "College & Institute st. stephens college"},
    { client_name: "Arena Animation", client_logo: "image/clients/college/arena-animation.png", search_text: "College & Institute Arena Animation3"},
    { client_name: "Shoots & Shoots", client_logo: "image/clients/college/shoots-n-shoots.png", search_text: "College & Institute Shoots & Shoots"},
    { client_name: "Strands Academy", client_logo: "image/clients/college/strands-academy.png", search_text: "College & Institute Aravali college of engineering & management"},
    { client_name: "Aravali College of Engineering & Management", client_logo: "image/clients/college/aravali.png", search_text: "College & Institute Aravali college of engineering & management"},
    { client_name: "Delta Wings", client_logo: "image/clients/college/delta-wings.png", search_text: "College & Institute shoots & shoots"},
    { client_name: "Delhi City School", client_logo: "image/clients/college/delhi-city-school.png", search_text: "College & Institute delhi city school"},
    // { client_name: "Shoots & Shoots", client_logo: "image/clients/college/shoots-n-shoots.png", search_text: "College & Institute Shoots & Shoots"},
    // { client_name: "Shoots & Shoots", client_logo: "image/clients/college/shoots-n-shoots.png", search_text: "College & Institute Shoots & Shoots"},

    // Architects
    { client_name: "Omaxe", client_logo: "image/clients/architectures/omaxe.png", search_text: " Architect Builders omaxe"},
    { client_name: "Vanbros", client_logo: "image/clients/architectures/vanbros.png", search_text: " Architect Builders omaxe"},
    { client_name: "Fab Studio", client_logo: "image/clients/architectures/fab.png", search_text: " Architect Builders Fab studio"},
    { client_name: "Lines & Forms", client_logo: "image/clients/architectures/lines&forms.png", search_text: " Architect Builders lines & forms"},
    { client_name: "Era Construction ", client_logo: "image/clients/architectures/era-construction.png", search_text: " Architect Builders era construction"},
    { client_name: "Design Tek Associations", client_logo: "image/clients/architectures/design-tek.png", search_text: " Architect Builders design tek"},
    { client_name: "Bundi Silica Exports", client_logo: "image/clients/architectures/bundi-silican.png", search_text: " Architect Builders bundi silica exports"},
    { client_name: "Vivek Traders", client_logo: "image/clients/architectures/vivek-traders.png", search_text: " Architect Builders vivek traders"},

    // clubs
    { client_name: "Totem Goa", client_logo: "image/clients/club/Totem.png", search_text: "Clubs totem goa"},

    // Fashion Designer 
    { client_name: "Priyal Bhardwaj", client_logo: "image/clients/fashion-designer/priyal.png", search_text: "Fashion Designers priyal bhardwaj" },
    { client_name: "Ritu Beri", client_logo: "image/clients/fashion-designer/ritu.png", search_text: "Fashion Designers ritu beri" },

    // ngo's 
    { client_name: "Anything Will Do", client_logo: "image/clients/ngo/awd.png", search_text: "NGO's anything will do awd" },
    { client_name: "Sangini Saheli", client_logo: "image/clients/ngo/sangini-saheli.png", search_text: "NGO's sangini Saheli" },
    { client_name: "Smile Foundation", client_logo: "image/clients/ngo/smile.png", search_text: "NGO's smile foundation" },
    { client_name: "NAB Foundation", client_logo: "image/clients/ngo/nab.png", search_text: "NGO's nab foundation" },
    { client_name: "ALVL Foundation", client_logo: "image/clients/ngo/alvl.png", search_text: "NGO's alvl foundation" },
    { client_name: "Alap", client_logo: "image/clients/ngo/alap.png", search_text: "NGO's alap" },
    { client_name: "The Inclen Trust Foundation", client_logo: "image/clients/ngo/inclen.png", search_text: "NGO's inclen" },
    { client_name: "Kadam", client_logo: "image/clients/ngo/kadam.png", search_text: "NGO's anything will do awd" },
    { client_name: "Bachpan Bachao Andolan", client_logo: "image/clients/ngo/bba.png", search_text: "NGO's bachpan bachao andolan" },
    { client_name: "Can Support", client_logo: "image/clients/ngo/cansupport.png", search_text: "NGO's Can Support" },
    { client_name: "Donate", client_logo: "image/clients/ngo/donate.png", search_text: "NGO's Donate" },
    { client_name: "Earth Matters", client_logo: "image/clients/ngo/earth-matters.png", search_text: "NGO's earth matters" },
    { client_name: "Blessed Heart Foundation", client_logo: "image/clients/ngo/blessed.png", search_text: "NGO's blessed heart foundation" },
    { client_name: "Earth Watch", client_logo: "image/clients/ngo/earth-watch.png", search_text: "NGO's earth watch" },
    { client_name: "UNDP", client_logo: "image/clients/ngo/undp.png", search_text: "NGO's undp" },
    { client_name: "Voice For The Deprived", client_logo: "image/clients/ngo/voice.png", search_text: "NGO's voice for the deprived" },

    // law farms
    { client_name: "Sagus Legal", client_logo: "image/clients/law/sagus-legal.png", search_text: "Law Farms sagus legal"},
    { client_name: "BMA Capital Advisors", client_logo: "image/clients/law/bma-capitals.png", search_text: "Law Farms bma capital advisor"},
    { client_name: "Rishnik", client_logo: "image/clients/law/rishnik.png", search_text: "Law Farms rishnik"},

    // consultants
    { client_name: "Aanchal Khetarpaal", client_logo: "image/clients/consultants/aanchal-khetarpal.png", search_text: "Consultants aanchal khetarpaal"},
    { client_name: "Urvashi Puri", client_logo: "image/clients/consultants/urvashi-puri.png", search_text: "Consultants urvashi puri"},

    // export house
    { client_name: "Tanisi International", client_logo: "image/clients/export-house/tanisi-international.png", search_text: "Export Houses tanisi international"},
    { client_name: "AM Automation", client_logo: "image/clients/export-house/am-automation.png", search_text: "Export Houses am automation"},
    { client_name: "Dominor", client_logo: "image/clients/export-house/dominor.png ", search_text: "Export Houses dominor"},
    { client_name: "Magnum Resources", client_logo: "image/clients/export-house/magnum.png", search_text: "Export Houses magnum resources"},
    { client_name: "Jyoti Apparels", client_logo: "image/clients/export-house/jyoti.png", search_text: "Export Houses jyoti apparels"},
    { client_name: "Bottoms Up", client_logo: "image/clients/export-house/bottomsup.png", search_text: "Export Houses bottoms up"},

    // industrials
    { client_name: "Lumax", client_logo: "image/clients/industrials/lumax.png", search_text: "Industrials lumax"},
    { client_name: "Karamsar Technology", client_logo: "image/clients/industrials/karamsar-technology.png", search_text: "Industrials karamsar technology"},
    { client_name: "Bathline", client_logo: "image/clients/industrials/bathline.png", search_text: "Industrials bathline"},
    { client_name: "Acqua Viva", client_logo: "image/clients/industrials/acqua-viva.png", search_text: "Industrials Acqua Viva"},

    // dj
    { client_name: "Dj Tanadeep", client_logo: "image/clients/dj/dj-tarandeep.png", search_text: "DJ & Artist tarandeep"},
    { client_name: "Dj Tripti", client_logo: "image/clients/dj/dj-tripti.png", search_text: "DJ & Artist tripti"},
    { client_name: "Hari Sukhmani", client_logo: "image/clients/dj/hari-sukhmani.png", search_text: "DJ & Artist hari sukhmani"},
    { client_name: "Rinaa shah", client_logo: "image/clients/dj/rinna-shah.png", search_text: "DJ & Artist rinaa shah"},

];

document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredClients = clients.filter(client => client.search_text.toLowerCase().includes(query));

    displayClients(filteredClients);
});

function displayClients(clients) {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = '';

    clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.classList.add('client-in');
        clientDiv.classList.add('col-sm-3');

        const clientLogo = document.createElement('img');
        clientLogo.src = client.client_logo;
        clientLogo.alt = client.client_name;

        const clientName = document.createElement('p');
        clientName.textContent = client.client_name;

        clientDiv.appendChild(clientLogo);
        clientDiv.appendChild(clientName);

        clientList.appendChild(clientDiv);
    });
}

// Initial display of all clients
document.addEventListener('DOMContentLoaded', function() {
    show_clients({ innerText: 'singers' });
});
function displayClinetsAll(clients){
    const clientList = document.getElementById('client-list-2');
    clientList.innerHTML = '';

    clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.classList.add('client-in');
        clientDiv.classList.add('col-sm-3');

        const clientLogo = document.createElement('img');
        clientLogo.src = client.client_logo;
        clientLogo.alt = client.client_name;

        const clientName = document.createElement('p');
        clientName.textContent = client.client_name;

        clientDiv.appendChild(clientLogo);
        clientDiv.appendChild(clientName);

        clientList.appendChild(clientDiv);
    });
}

function show_clients(elem){
    // console.log(elem.value)
    const query = elem.innerText.toLowerCase();
    // const query =  'singers'
    const filteredClients = clients.filter(client => client.search_text.toLowerCase().includes(query));
    displayClinetsAll(filteredClients);

}

// displayClients(clients);

