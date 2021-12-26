
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
// import { getProfile } from "../../store/profile";
import { createConversation } from "../../store/conversation";
import { useHistory } from 'react-router';
import { getConversations, clearConversation } from "../../store/conversation";
import { getProfiles } from "../../store/profile";


const DiscoverHoroscopeProfile = ({profile}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [horoscopes, setHoroscopes] = useState([])

  // console.log("profile🤠🤠🤠🤠🤠🤠🤠🤠🤠🤠-------------", profile)


  // this profile_id value is actually the user.id, bad naming on my part haha
  let profile_id = profile[0]


  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]

  // console.log("conversations-------", conversations)

  useEffect(async () => {

    await dispatch(getProfiles())
    // await dispatch(getConversations())

    if (!isLoaded) setIsLoaded(true);

  }, [dispatch, profiles.length, isLoaded, conversations?.length])

  useEffect(async () => {
    await dispatch(clearConversation())
    await dispatch(getConversations())

    if (!isLoaded) setIsLoaded(true);

  }, [dispatch, profiles.length])


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/horoscopes/');
      const responseData = await response.json();
      setHoroscopes(responseData.horoscopes);
    }
    fetchData();
  }, []);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


  const getUserName = (user_id) => {
    const usernameDisplay = users?.filter(function(el){
      return el.id === user_id
     });
    //  console.log("try", user_id)
    //  console.log("tryThis", usernameDisplay[0].username)
    if (usernameDisplay) {
     return usernameDisplay[0]?.username
    }
    else {
      return null
    }
  }


  const checkConversationExists = (user_id_one, discoverUserId) => {


    const existingConvo = conversations?.filter(function(convo){

      if(((convo?.user_id_one === discoverUserId) && (convo?.user_id_two === user_id_one)) || ((convo?.user_id_two === discoverUserId) && (convo?.user_id_one === user_id_one))) {
        // console.log("convo in if", convo)
        return convo
      } else {
        return null
      }
    })
    // console.log("existingconvo", existingConvo)
    return existingConvo

  }

  const getUserProfile = (user_id_one) => {
    const userProfile = profiles[0]?.filter(function(profile){

      return profile?.user_id === +user_id_one
    })
    if(userProfile) {
      // console.log("match match", userProfile)
      return userProfile
    }
    else {
      return null
    }
  }

  const getHoroscope = (horoscopeId) => {
    const userHoroscope = horoscopes?.filter(function(horoscope){
      return horoscope.id === +horoscopeId
    });
    if(userHoroscope) {
      return userHoroscope[0]?.sign
    }
    else {
      return null
    }
  }

  let userProfileObj = (getUserProfile(user_id_one))


  const handleCreateConversation = async (discoverProfileId) => {
    // console.log("discoverProfileId", discoverProfileId)


    let conversationExists =  checkConversationExists(user_id_one, discoverProfileId)
    // console.log("conversationexists", conversationExists)

    if(conversationExists[0]?.id) {
      history.push(`/conversations/${conversationExists[0]?.id}`)
    } else {

      let user_id_two = discoverProfileId
      let formData = {user_id_one , user_id_two}

      let newConversation = await dispatch(createConversation(formData))

      let convo = Object.values(newConversation)

      if(newConversation){
        history.push(`/conversations/${convo[0]?.id}`)
      }
    }
  }

  /*
  Horoscopes id # in db

  1 Aries
  2 Taurus
  3 Gemini
  4 Cancer
  5 Leo
  6 Virgo
  7 Libra
  8 Scorpio
  9 Sagittarius
  10 Capricorn
  11 Aquarius
  12 Pisces

  */

  // console.log("userProfileObj[0].horoscope", userProfileObj[0].horoscope_id)

  let horoscopeContent;

  const getHoroscopeMatchPercent = (matchHoroscopeId, userHoroscopeId) => {

    // aquarius and cancer match
    if((+userHoroscopeId === 11 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 11 )) {
      horoscopeContent = " Cancer and Aquarius are not your usual happy couple in most cases. Their relationship can be too stressful for Cancer partner and the lack of intimacy will most probably tear them apart. However, the link between them can actually be wonderful when found, and they could open up such interesting new perspectives for one another if this happens. They both want to learn new things and could travel far if a strong base is made at home, so Cancer can remain peaceful."
      return 31
    }

    // aries and aries match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 1 )|| (+userHoroscopeId === 1 && +matchHoroscopeId === 1 )) {
      horoscopeContent ="When two Aries come together, it is imperative for at least one of them to have mastered the art of staying calm. If this is achieved by one of them, not through passive aggression but through rational thought, their relationship can be truly rewarding. As two warm and passionate people, they can share many adventurous moments that raise their energy levels sky high. If, however, none of them has this rational, grown-up ability, it is only possible to prolong their relationship based on superficial activities and sex, of course. Since the sign of Aries takes Saturn, the wise ruler of time, patience and responsibility to its detriment, one of these partners will have to learn their lesson and take responsibility for the future of their relationship if they are to last in time."
      return 75
    }

    // aries and taurus match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 2 )|| (+userHoroscopeId === 2 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This is a relationship full of personal challenges and individual depth. If they want to succeed as a couple, many internal issues in both must be solved. Only if they both accomplish peace in their lives, have just enough education, just enough other relationships and acquired just enough humor, they might be able to put aside their differences and listen to each other well enough. It is not that hard, except when you are used to using your horns."
      return 63
    }

    // aries and gemini match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 3 )|| (+userHoroscopeId === 3 && +matchHoroscopeId === 1 )) {
      horoscopeContent = "The overall impression of this couple would be good, exciting and challenging, a relationship where both partners can learn a lot and be active in a healthy way. The main problem with their romantic involvement is the lack of trust, especially if Aries partner gets too attached to Gemini, always fighting for their freedom. The need for conversation with a lot of essence is bigger than any positive or any negative aspects of their relationship and both of them should always have this in mind. In general, there is a big chance these two will end up together, because their shared love of adventure is bigger than most of their troubles."
      return 74
    }

    // aries and cancer match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This relationship can be painful for both partners and needs a lot of work put into it in order to work. It requires both of the partners to adapt and make changes in their behavior, while tip toing around each other most of the time. It is not an easy road, but the rewards are such inner understanding of passion, full of emotion and the ability to create something truly unique. If they succeed, they will probably never be satisfied with a different partner."
      return 47
    }

    // aries and leo match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 1 )) {
      horoscopeContent="The relationship of Aries and Leo is passionate and turbulent, but they don’t seem to mind an occasional fight and a sharp word. When they fall in love deeply, they are almost impossible to separate as they stubbornly hold on to the idea of their future together. Although they are not two of the most romantic believers in love, they are passionate in their beliefs and when they find love, they will fight for it until there is literally nothing left of their relationship. It is meaningless to advise gentle behavior or looking for peace, because the entire world of their relationship is based on the element of Fire they share. It is pointless to look for peace, when the opposite of peace is what attracts them in the first place. For as long as they love each other and stay faithful and true, they will be tied up in a relationship they need to fight for every day. Their main objective is to find a way to enjoy the fight and have fun."
      return 83
    }

    // aries and virgo match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 1 )) {
      horoscopeContent="It’s a good thing that the relationship between an Aries and a Virgo is never boring. Although in most cases they are not really meant to last, it can still be a fun experience if none of them takes their potential for a shared future too seriously. In case they take the best out of their relationship, giving it enough freedom and unpredictability, Virgo would incorporate some of Aries’ energy, while Aries would allow Virgo to teach them how to organize their thoughts and communicate calmly. This way they might come to the point where their relationship could actually last, and the outcome depends on their ability to relax and have fun together."
      return 42
    }

    // aries and libra match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 1 )) {
      horoscopeContent="However difficult it might be to reconcile these two natures, remember that this is a primal opposition that represents partners by signification. Aries and Libra are the couple of the zodiac, as much as any other opposing signs, for they are each other’s seventh house, house of relationships. Even more so if we acknowledge the fact that Libra is the sign of relationships in general. Any problem they might have with each other is something to be worked on, because it shows what their personal problem with any relationship is. When they are madly attracted to each other and fall in love, there is almost nothing that could separate them, no matter the differences. Wouldn’t we all like to find the middle ground with our loved one? They need to work on their bond, that’s a fact, but their relationship is a promise of a perfect fit of two souls meant to be together."
      return 62
    }

    // aries and scorpio match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 1 )) {
      horoscopeContent="Think of this combination of signs through the most aggressive image of Fire and Water element. Fire evaporates Water, just like Aries shatters Scorpio’s feelings. Water damps down Fire, just like Scorpio wears Aries out. They seem to bring out the worst in each other and this is nobody’s fault, it is just hard to reconcile so much focused energy that moves in two different directions. Their relationship is like the process of nuclear fusion and often just too much to handle."
      return 48
    }

    // aries and sagitarrius match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This is definitely a couple with lots of potential. They might have to stand up to their environment and defend their feelings from others, but this won’t shake them too much, for neither of them thinks that much about the opinion of others anyway. If they manage to mend their philosophical differences and respect each other’s different opinions, they could become one of the warmest relationships in the zodiac. Their main relationship advice would be to always tell the truth to each other and not go crazy about their healthy differences. Their differences are exactly the thing that could make their sexual life more exciting."
      return 87
    }

    // aries and capricorn match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This is not an easy relationship. None of the partners has any trace of lightness and blissful ignorance. This is why their relationship might seem like a competition to ruin the relationship in the best possible way. It is hard to say who will get out of it a winner, for they will both feel lousy most of the time and be relieved that they finally separated. If they stubbornly decide they love each other too much to let each other go, both of them would probably bang their heads against a wall for years to come. Their only chance of success is unconditional respect and the wideness of their views and expectations. They could truly complement each other, but only in a scenario where they would look for good in one another and highlight each other’s qualities. Unfortunately, the malefic nature of their rulers rarely allows for them to be this positive and acceptance oriented. If they got together, and whatever their story is, they should think about the things they could learn from each other instead of looking for each other’s shortcomings, and always stay out of each other’s business."
      return 38
    }

    // aries and aquarius match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This is a couple that lacks tenderness. They are not two brutes who let their relationship fade as soon as their passion does, but the distant examining look of Aquarius can take out the emotion out of it. Aries partner needs to be relaxed by their significant other, so they can melt down and show their true, warm emotional nature. In this relationship, they would have a distant partner that basically supports their primal, instinctive nature. Although it is nice to think that the point of each relationship is for partners to accept each other as they are, in this case that would take away every chance for an Aries to grow through togetherness and learn about their emotional nature. This is something they will never be satisfied with. Still, every relationship with Aquarius can surprise us as much as any individual Aquarius could. With them as a partner, there is always room for an enlightening scenario that leaves all things to free will. In case they decide to share their lives together, they should have a screaming room they could individually visit once in a while. This would probably do the trick. And about that lack of emotion, they could just put in a lot of physical tenderness to begin with and let things go from there."
      return 68
    }

    // aries and pisces match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This is a relationship disturbed mostly by the lack of trust and the ability of both parties to open up to their partner. Aries is ruled by Mars, the planet that rules our first chakra, responsible for our ability to set good boundaries. Pisces is ruled by Neptune, in charge of our entire aura and our permeability for outside stimuli. Since they are both responsible for our border with the outside world, it is hard to say which partner should loosen up and make it possible for them to come close. Their only chance of a happy ending is if Aries partner dives in and their Pisces partner wakes up."
      return 29
    }




    // Taurus and Taurus match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 2 )|| (+userHoroscopeId === 2 && +matchHoroscopeId === 2 )) {
      horoscopeContent="The relationship between two Taurus representatives is something to cherish and hold on to, only if they are not both too stubborn in their intent to wait for the other person to make the first move. Because of their emotional and sensual nature, they can be very attentive to each other’s needs and take care of one another when necessary. Their problem usually shows only through the double set of horns, making them sink too deep into their differences with no apparent reason. If they could open up to each other, and to their mutual need for change, this is a relationship both of them would find extraordinary."
      return 86
    }
    // Taurus and gemini match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 3 )|| (+userHoroscopeId === 3 && +matchHoroscopeId === 2 )) {
      horoscopeContent="The relationship between Taurus and Gemini doesn’t give much promise to begin with. Still, the fixed quality of the sign of Taurus can give them enough endurance and persistence to last in their intent to be with a Gemini, long enough for them to really get to know each other well. Although their chances to reconcile their differences are slim, if Taurus partner puts their whole heart into it, they might manage to become the most relevant part of their Gemini’s life as their base and their reliability in everything they do. In case they accept each other completely, Taurus will give Gemini their connection to planet Earth, to their body and their daily routine, giving them the base for health and normal functioning. In return, Gemini will give their Taurus wings and, better yet, teach them how to fly."
      return 23
    }

    // Taurus and cancer match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 2 )) {
      horoscopeContent="Taurus and Cancer present the gentlest couple of the zodiac. When they fall in love, they will rarely find the reason to separate, because of their shared emotional goals for love, understanding, family and the feeling of home. This is the relationship that seems like a perpetuum mobile of love, in case both partners don’t already have too much emotional baggage that makes them unable to give and receive this depth of emotion. Even if they do, with no obstacles on the way, they will likely learn to forgive and forget as the flow of their relationship takes them to what they always desired."
      return 91
    }

    // Taurus and leo match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 2 )) {
      horoscopeContent="The relationship of Taurus and Leo could be aggressively challenging if not for their warm natures ruled by Venus and the Sun. Although they are both signs of fixed quality with entirely different natures, if they gather enough patience before they enter their relationship, they have a chance to become your archetypal couple of a girl and a boy. When their masculine and feminine principles are in balance, they can use them to mend their sexual, intellectual and financial circumstances and really enjoy each other."
      return 29
    }

    // Taurus and virgo match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 2 )) {
      horoscopeContent="In general, Taurus is there to teach Virgo about love, tenderness and sexuality. Virgo needs to be flexible enough to value their Taurus and give them the intellectual view on things they might idealize. Their relationship could be a match made in heaven, only if they are not too scared of being hurt and too distrustful. If they do give in to each other and fall madly in love, they could be the combination of a clear heart, represented by Taurus, and a clear mind, represented by Virgo. What more would they need than each other?"
      return 73
    }

    // taurus and libra match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 2 )) {
      horoscopeContent="Look out Libras, for Taurus is here to wake your inner fears and bring them all to surface! Taurus should be careful, too, for their need to feel guilt could blossom with a Libra. This relationship is a lesson both of them will never forget, especially if they manage to build enough understanding and tenderness between them. The only way they could ever be happy would be to embrace what they don’t want to deal with in their own inner worlds. If they do this, well you can imagine what a Venus complete would be like."
      return 33
    }

    // taurus and scorpio match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 2 )) {
      horoscopeContent="Taurus and Scorpio are both signs of deepest physical pleasure, each in their own way. This has to be the focus of their relationship, for they can’t seem to understand platonic and imaginative relationships when they get together. There is no such thing as a platonic experience of romance, when the whole point of romance is to get physical. It is very possible that they will build their sexual life to the point where no other partner could ever satisfy their needs.This could lead to a possessive relationship with no way out, although they probably wouldn’t want to get out even if they could. The entire experience can be too dark for the Taurus partner, especially if their practical sense is challenged by Scorpio’s character. In case they are both independent and ready to blend with someone else, they could be the perfect connection between sexual and emotional, the one that we all wish for."
      return 89
    }

    // taurus and sagitarrius match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 2 )) {
      horoscopeContent="With their inner beauty and the understanding they share in search of the truth to life, these two might seem as a perfect couple. However, every positive needs a negative to complete it, and when we really observe, we can notice that often a Taurus and a Sagittarius don’t even get attracted to each other. Taurus needs earthly pleasures in their relationships and as a fixed, Earth sign it is the slowest of all signs. This is not exactly someone who can easily understand the fast, changeable and fiery Sagittarius.The best possible scenario for their relationship would be for them to get to know each other very well and build a friendship without expectations, for years. In the end, this could result in deep understanding that would provide them both with enough patience to actually start a relationship that has a future. If not, they can always hold on to beauty in the world. Imagine how wonderful their world of creation could be if they joined their forces of good."
      return 31
    }

    // taurus and capricorn match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 2 )) {
      horoscopeContent="Taurus and Capricorn can form a relationship so deep that their creative power in the material realm could seem unreachable for other signs of the zodiac. With the ability to complement each other in a gentle, slow way, they are the most boring couple on the outside, with most exciting inner activity that stays hidden from the rest of the world. If Taurus motivates their Capricorn partner, and Capricorn shows the way of accomplishment to their Taurus partner, they could work together, raise children and share a life with more fun than they are both used to, or simply form an unbreakable bond. When their deep emotions intertwine, they are bound to each other for eternity."
      return 89
    }

    // taurus and aquarius match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 2 )) {
      horoscopeContent="Taurus and Aquarius are people from two different worlds. Still, there is a strange similarity and connection between their rulers and although very challenging, this is a relationship where both partners could fall in love with each other, over and over again, every single day. They are ruled by Venus and Uranus, both planets rotating in a direction opposite to the direction of other planets. They are two outcasts, different and standing out together, they understand that East can be where West is, and vice versa. They understand diversity, change of direction and the excitement of love. However, they will rarely get to the point to understand each other because of their excessive need for peace (Taurus) and excitement (Aquarius). What a strange pair these signs are. With such an obvious opportunity for electric love, they go around it and search for something else."
      return 11
    }

    // taurus and pisces match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 2 )) {
      horoscopeContent="This is a relationship based on love and full of it while it lasts. They both crave romance and beauty in their lives, and will do anything that is needed to keep the beauty going between them. Taurus will give their Pisces partner a chance to connect to the real world, showing them how to ground their creativity, while Pisces will lift up Taurus and make them a bit softer and more flexible. They seem to be on a mission of convincing them that true love exists. When their relationship is over, they will both know it instantly and very often a conversation about a breakup would be redundant. If they savor their trust and nurture the beauty of love they share, their relationship can last and be as inspiring as a dream coming true."
      return 88
    }


    // gemini and gemini match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 3 )|| (+userHoroscopeId === 3 && +matchHoroscopeId === 3 )) {
      horoscopeContent="The relationship between two Gemini will give other signs of the zodiac an almost certain headache. They will go everywhere together, do everything together and talk about everything with one another, again and again, until one of them loses interest in the other. Because of their possibly superficial approach, it is best if they have already had some relationships with depth before they met each other. This could give them the quality to last together for longer than a week or two.In most cases, this is not a relationship they will want to stay in, although their mutual understanding is perfect. It is like they are too similar, and at the same time a relationship of too many personalities. If each of them isn’t gathered into one person, they will need someone who is, to hold their balance and not let them dissipate. In case they have built up personalities and each of them understands their own inner core, they can probably live forever and never consume the energy their connection brings."
      return 83
    }

    // gemini and cancer match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 3 )) {
      horoscopeContent="Gemini and Cancer are next to each other in the zodiac, and they are likely to be next to each other in friendship. When it comes to emotional or sexual relationships, there seems to be too many things that set them apart. In order for their relationship to last, they both need to make some adjustments. Gemini will hardly ever change their routine for someone, especially when they find someone’s way of life boring, so the best thing to do here is to give them their freedom. If Cancer falls in love deeply enough, they will understand what their Gemini partner needs, and won’t hold them back even if they wished for them to be different. Gemini partner has to open their heart and listen to those few words that Cancer wants to share. Even though they can speak about many things, when it comes to discussions of their relationship, their views on it are different. Gemini needs to keep it interesting and Cancer needs to be heard, as much as felt. If they give each other enough freedom and understanding, they could be like children in love for the first time."
      return 21
    }

    // gemini and leo match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 3 )) {
      horoscopeContent="Gemini and Leo can have so much fun that it could make the rest of the zodiac envious. They both consider their day best spent in laughter, and if they share friends, they could seem like a perfect couple. Their main challenge is the difference in their approach to change and they both need to make room for small adjustments in their behavior if they want their relationship to last. Leo will need to make room for more movement and understand what seems to be “flakiness” of their changeable Gemini partner, while Gemini will have to understand that Leo is in fact keeping them together for however long they are meant to last. Their mutual respect can usually overcome any boundaries, and they should keep having fun and building their relationship on a solid foundation of childish joy."
      return 82
    }

    // gemini and virgo match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 3 )) {
      horoscopeContent="The relationship of Gemini and Virgo can change as the wind, while both partners get lost and found on a daily basis. Their mutual love for Mercury is what binds them and what tears them apart, because they both tend to overthink things instead of following their hearts. Both of them are mostly in their minds, each one in their own way, and need to respect each other to the point where no one’s intelligence is judged on a superficial level. If they do fall in love, they will become a unification of Air and Earth Mercury – heaven on Earth."
      return 40
    }

    // gemini and libra match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 3 )) {
      horoscopeContent="Gemini and Libra partners are not exactly always a perfect couple, although their signs support each other. If Libra partner has trouble being alone and doing things by themselves, this isn’t something Gemini will easily understand. Due to their lack of personal boundaries, Libra representatives will often let their Gemini partners lead the way until all of their energy is gone, they feel like they should only lie down and turn their brain off. If they want to work on their relationship and be happy, Libra needs to respect their Gemini partner enough to let them be their teacher, lover and a friend. In return, Gemini will have to take care of their Libra partner, respecting their limits and their need for togetherness."
      return 78
    }

    // gemini and scorpio match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 3 )) {
      horoscopeContent="Gemini and Scorpio will usually annoy each other senseless. None of them will lightly understand their partner’s personality. To Gemini, their partner will seem too depressed and dark for no apparent reason, and for Scorpio, this could be an experience with no purpose or depth. If they do fall crazy in love, they could connect through their mutual love of change and give each other the exact things they lack. Gemini would get deep, emotional satisfaction they have never felt before and Scorpio would finally get the chance to rest their troubled soul, and realize that not everything needs to be taken seriously. This is a relationship of great lessons and an enormous capacity for personal growth of both partners."
      return 15
    }

    // gemini and Sagittarius match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 3 )) {
      horoscopeContent="Gemini and Sagittarius make an incredible couple, probably being the most innocent one of all oppositions in the zodiac. They don’t often find each other right away, but at some point in life it is almost certain that a Gemini will find their Sagittarius and vice versa. Their relationship has a strong intellectual connection, in which they will gradually find deep emotions. There is no real prognosis how this will end though, because the emotions they feel could easily scare them away and their relationship could end only because of fear. If they decide to give in and find out what they could share, with Gemini’s ideas and Sagittarius’ beliefs, the sky is the limit. Or is it beyond?"
      return 92
    }

    // gemini and capricorn match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 3 )) {
      horoscopeContent="Gemini and Capricorn partners are a very strange fit. Although they are both looking for things the other person has, they don’t seem to recognize them in each other. While Gemini needs someone to ground them and give them depth, when they look at Capricorn, they see someone old, unmovable and boring. Capricorn needs joy and relaxation in their life, but Gemini seems like a ball of uncontrollable, superficial opinions heading nowhere. In truth, they could have a valuable experience being together, sharing their different lives day after day. They might even find out that they actually work well together and have the ability to reach any goal that they think of."
      return 15
    }

    // gemini and aquarius match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 3 )) {
      horoscopeContent="Gemini needs a partner who doesn’t bore them or make them feel inhibited. When you look at things this way, you could say that there is no better match for them than the fabulous Aquarius. Aquarius needs someone to understand their grandiose ideas and discuss each one with them, and also someone who doesn’t make them feel inhibited. Who could do this better than Gemini? However, they could find themselves in a relationship that doesn’t have enough emotion and compassion, and this is certain to surface as soon as the first disturbing thing happens in the life of one of these partners. They need to work on their emotional base and their non-verbal understanding if they want their relationship to last."
      return 85
    }

    // gemini and pisces match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 3 )) {
      horoscopeContent="Gemini and Pisces are squaring signs that often don’t have that much in common. They are both usually positive enough to have a superficial enjoyable relationship and go well together at large social gatherings. They could both forget to call each other when they agreed to, and they can both change their opinions in two seconds, but they simply don’t share the same goals. As a strongly mental and a strongly emotional sign, their lack of understanding can be hurtful for Pisces and sometimes for both of them. If they do fall in love and start a romantic relationship, chances are they will not last very long. However, there is a beauty in the creative side of this relationship and if Gemini decides to truly listen to Pisces, they could help them use their talent in a constructive way. In most situations Pisces will just drain the energy out of their Gemini partner, especially if they end up in their fragile, needy mode that some other signs could understand much better than Gemini. If they are to succeed in their persistence to be together, they should work together and socialize a lot. The most important thing for both of them in this relationship is to reach for their emotional cores and give in to true intimacy, or they will never manage to communicate."
      return 10
    }



    // cancer and cancer match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 4 )) {
      return 75
    }

    // cancer and leo match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 4 )) {
      return 70
    }

    // cancer and virgo match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 4 )) {
      return 75
    }

    // cancer and libra match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 4 )) {
      return 60
    }

    // cancer and scorpio match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 4 )) {
      return 95
    }

    // cancer and sagitarrius match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 4 )) {
      return 55
    }

    // cancer and capricorn match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 4 )) {
      return 45
    }

    // cancer and aquarius match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 4 )) {
      return 70
    }

    // cancer and pisces match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 4 )) {
      return 90
    }



    // leo and leo match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 5 )) {
      return 85
    }

    // leo and virgo match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 5 )) {
      return 75
    }

    // leo and libra match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 5 )) {
      return 65
    }

    // leo and scorpio match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 5 )) {
      return 75
    }

    // leo and sagitarrius match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 5 )) {
      return 95
    }

    // leo and capricorn match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 5 )) {
      return 45
    }

    // leo and aquarius match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 5 )) {
      horoscopeContent="Signs of Leo and Aquarius combined represent the ultimate creativity, famous scientific discoveries, the first man in an airplane and the first man on the Moon. Imagine what these partners could do together if they let each other lead the way when the territory of their rule is in front of them. They both need to learn to let go of the image they have about themselves and about each other, or they won’t get very far stuck in their unnecessary ego battle. Warm and cold, hearted and smart, nuclear gravitation and vacuum in space, it cannot be easy to mend their differences or form a stable, loving relationship. The best thing they could do is find a cause they will support together. This would give them a focus on the outer world and allow them to deepen the inner emotional world of their relationship while fighting outside of it."
      return 70
    }

    // leo and pisces match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 5 )) {
      return 75
    }



    // virgo and virgo match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 6 )) {
      return 70
    }

    // virgo and libra match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 6 )) {
      return 80
    }

    // virgo and scorpio match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 6 )) {
      return 85
    }

    // virgo and sagitarrius match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 6 )) {
      return 70
    }

    // virgo and capricorn match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 6 )) {
      return 95
    }

    // virgo and aquarius match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 6 )) {
      return 50
    }

    // virgo and pisces match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 6 )) {
      return 70
    }



    // libra and libra match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 7 )) {
      return 80
    }

    // libra and scorpio match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 7 )) {
      return 85
    }

    // libra and sagitarrius match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 7 )) {
      return 80
    }

    // libra and capricorn match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 7 )) {
      return 85
    }

    // libra and aquarius match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 7 )) {
      return 95
    }

    // libra and pisces match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 7 )) {
      return 50
    }




    // scorpio and scorpio match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 8 )) {
      return 90
    }

    // scorpio and sagitarrius match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 8 )) {
      return 85
    }

    // scorpio and capricorn match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 8 )) {
      return 65
    }

    // scorpio and aquarius match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 8 )) {
      return 60
    }

    // scorpio and pisces match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 8 )) {
      return 95
    }


    // sagitarrius and sagitarrius match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 9 )) {
      return 85
    }

    // sagitarrius and capricorn match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 9 )) {
      return 55
    }

    // sagitarrius and aquarius match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 9 )) {
      return 60
    }

    // sagitarrius and pisces match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 9 )) {
      return 75
    }


    // capricorn and capricorn match
    if((+userHoroscopeId === 10 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 10 )) {
      return 85
    }

    // capricorn and aquarius match
    if((+userHoroscopeId === 10 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 10 )) {
      return 70
    }

    // capricorn and pisces match
    if((+userHoroscopeId === 10 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 10 )) {
      return 85
    }

    // aquarius and aquarius match
    if((+userHoroscopeId === 11 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 11 )) {
      return 80
    }

    // aquarius and pisces match
    if((+userHoroscopeId === 11 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 11 )) {
      return 55
    }


  }



  return (
    <>

    { isLoaded && (
      <>
      <div className="oneMatchProfileContainer">
          <div className="oneMatchProfileContainerHeader">
            {getUserName(profile?.user_id)}
            <div className="matchButtonsContainer">
              <button
              className="matchButton"
              onClick={() => {handleCreateConversation(profile?.user_id)}}
              >Message  <i className="far fa-comment-dots"></i></button>

              <button
              className="matchButton"
              >Like  <i className="fas fa-heart"></i></button>
            </div>

          </div>

          <div className="match_profile_images_container">
            <img className="match_profile_image_discover" src={profile?.image_url1} alt="match_image"/>
            <img className="match_profile_image_discover" src={profile?.image_url2} alt="match_image"/>
            <img className="match_profile_image_discover_noP" src={profile?.image_url3} alt="match_image"/>
          </div>

          <div className="spacer-match">&nbsp;&nbsp;</div>

          <div className="matchPercentContainer">
            <div className="matchContainerHeader">
              {getHoroscope(userProfileObj[0].horoscope_id)} and {getHoroscope(profile.horoscope_id)}

            </div>
            <div className="MatchProfileInnerContainer">
              <div className="circlesContainer">
                <div className="userPhotoMatch-first" style={{ backgroundImage: `url('${userProfileObj[0]?.image_url1}')` }}></div>
                <div className="userPhotoMatch-last" style={{ backgroundImage: `url('${profile?.image_url1}')` }}></div>
                <div className="matchPercentCircle">{getHoroscopeMatchPercent(profile.horoscope_id,userProfileObj[0]?.horoscope_id)}%<div><i className="fas fa-heart"></i>&nbsp;</div></div>
              </div>
              <div className="agreeTable">
                  {horoscopeContent}
              </div>
            </div>

          </div>

      </div>
      <hr></hr>
      </>

      )
    }

    </>

  )

}


export default DiscoverHoroscopeProfile
