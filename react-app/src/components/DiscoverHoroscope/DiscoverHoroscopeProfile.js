
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
      horoscopeContent="Cancer is a sign of genetic inheritance and it is sometimes difficult to reconcile the genetic predispositions of two Cancer partners. However, their mellow nature, ability to feel and have enough compassion for each other, makes them great candidates for marriage, children and the whole picket fence scenario. Their sex life and their shared activities could suffer a general lack of initiative, energy and movement. Because of this, they should both try not to end up in a boring everyday routine in which they only eat and sit in front of a TV as soon as they come home from work. It is important for them to have enough tender surprises and activities that build their physical relationship, or they might end up unsatisfied and not really understanding why. If they are troubled by this possible shortcoming of their relationship, as two tender individuals, they will manage to make each other feel wonderful, even if that means breaking up."
      return 85
    }

    // cancer and leo match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 4 )) {
      horoscopeContent ="Although the Moon reflects the light from the Sun, the sign of Cancer doesn’t really see Leo as the source of all their joy. Leo is a sign that should spread joy and love with an active approach to each one of their relationships. How is it possible that Cancer is immune? Well probably because the Moon circles around the Earth, not the Sun. They are special, that’s for sure. Both of them are strong individuals, each on their own plane. Their lack of understanding and emotional touch can be explained through the fact that both of them have a mission to spread love to the less fortunate signs of the zodiac. Not everyone is born with an emotional flow like Cancer and a huge, warm heart like Leo. If they kept all this love to themselves, some unfortunate souls would probably search for them aimlessly, and the world would be a much sadder place."
      return 29
    }

    // cancer and virgo match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 4 )) {
      horoscopeContent="Cancer and Virgo can have a wonderful connection and are usually brought together by sexual understanding. The main problem of their relationship is in the possible conflict between emotional Cancer and reasonable Virgo. If they manage to overcome this, accepting each other’s shortcomings and learning to incorporate some rationality or some emotion into their lives, they could end up in an inspiring relationship that will last for a very long time. In a way, they complement each other as much as the heart complements the mind. If they share a spark of love, it would be a shame to miss the opportunity for happiness just because of someone’s irrational expectations or someone’s closed heart."
      return 77
    }

    // cancer and libra match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 4 )) {
      horoscopeContent="Probably the biggest restriction in the relationship between Cancer and Libra is in things they want from their partner. Cancer wants someone responsible, to take them by the hand if needed and complement their emotional nature with practicality. Libra wants someone who is full of life, energized, strong and full of initiative to follow their ideas. They can really disappoint each other if any expectations are set wrongly at the beginning of their relationship. The best way for them to build a love that is to last, is for both partners to hold on to their independence whatever happens. If they focus on love and worry about earthly things each on their own, Cancer could “compromise” on heavenly love, as much as Libra would like to have a family."
      return 28
    }

    // cancer and scorpio match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 4 )) {
      horoscopeContent="The sign of Scorpio is associated with death and all kinds of bad things, but all of their maliciousness comes from their emotional and sexual repression. Cancer can usually understand the need of their Scorpio partner to express their deepest, darkest emotions in their sex life. If Cancer partner doesn’t get scared or too forced to do something they are not ready for, a sexual relationship between Cancer and Scorpio can be deeply satisfying for both partners.This is a relationship of two Water signs and because of this their sex life needs to reflect all of their emotional connection or a lack of it if there is any. When they fall in love, they will both need to express their feelings and the intimacy they might share is incredible."
      return 90
    }

    // cancer and sagitarrius match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 4 )) {
      horoscopeContent="Cancer and Sagittarius are usually signs that aren’t attracted to each other at all. If attraction and love are born between them, they will rarely have a damaging relationship for any one of them, because their signs are ruled by the Moon and beneficent Jupiter. It is safe to assume that they will be good for each other, for as long as their relationship lasts, but it is rare for them to succeed in the long run if they don’t have strong support from positions in their personal horoscopes. As much as Cancer can reach the depth of their partner’s faith, Sagittarius can widen their partner’s horizons and make them much happier in their approach to the world. If they have feelings for each other, it would be a shame not to act on them and miss the opportunity to peacefully grow."
      return 27
    }

    // cancer and capricorn match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 4 )) {
      horoscopeContent="Cancer and Capricorn are usually bound to relive the love story of someone who lived before their time. This deeply seeded need to mend what is broken in our family tree is something we all carry within, but these Sun signs are predestined to handle karmic debts and residue emotions from their families. They will have to deal with problems first if they want to be free of the past, and only after they have repaid what needed to be repaid, will they be able to truly choose one another. In most cases this is a once in a lifetime love for both partners, and they will probably choose each other without a doubt."
      return 84
    }


    // cancer and pisces match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 4 )) {
      horoscopeContent="As two Water signs, Cancer and Pisces connect through emotions, usually as soon as they lay eyes on each other. This is one of the typical combinations of zodiac signs for love at first sight. Their main challenge is hidden in the changeable nature of the sign of Pisces, not because it is there, but because they might fear to show it. Their biggest problem lies in the fact that they give priority to different types of love in their life. If passion and sensual, sexual love isn’t there, Pisces will rarely be satisfied with the love they get from their family, and Cancer would find a life without a family nest very depressing. A fine balance needs to be made between excitement and stability, and they could be one of the most wonderful couples of the zodiac – Cancer inspired and Pisces with a feel of home."
      return 72
    }



    // leo and leo match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 5 )) {
      horoscopeContent="Two Leo partners can do the impossible and this fact could keep them in a perfectly satisfying relationship for a long time. Their main goal is to find true intimacy and understand each other’s inner emotional beings. Leo has a habit to exaggerate and make drama out of small, irrelevant things, but this could be a good thing for their relationship because of their social status and the ability to support each other’s theatrical needs. If they begin a battle for supremacy, it might be a good idea to set the territory that each of them is in charge for. If one of them is the best at an emotional department, the other one can be the best in the sexual one. If they split their rules this way, it will be much easier for both of them to function and think of each other as worthy of the relationship. What might make a loving relationship between them impossible is the lack of respect. If they catch this disease, it might be best for them to part ways and search for different partners."
      return 78
    }

    // leo and virgo match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 5 )) {
      horoscopeContent="Leo and Virgo form a constructive relationship that rarely serves their emotional natures. They both tend to be too rational and their mental strength will rarely be a good foundation for a fairytale love they secretly wish for. Both of these signs have opposing signs linked to Neptune. Leo’s opposing sign is Aquarius, the sign of Neptune’s exaltation, while Virgo’s opposing sign is the sign of Pisces, ruled by Neptune. Both of them need someone perfect, someone made just for them, and if they just think for a second that they don’t belong together, their search of perfection will prevail. It is rare for these partners to form a strong emotional or sexual bond, however well they might get along when it comes to work and communication."
      return 35
    }

    // leo and libra match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 5 )) {
      horoscopeContent="If you want to sum up the relationship between a Leo and a Libra, you have to understand that their bond involves the beautiful and challenging dignities of Saturn and the Sun. They have a lot to learn from each other, and the main goal of their relationship is to reach the point of shared respect and responsibility in a perfect balance of power. It will sometimes be hard for them to overcome the need for competing, trying to determine who is a better, smarter or a more capable person. Even if they don’t, their relationship will be something to enjoy and show off in public."
      return 75
    }

    // leo and scorpio match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 5 )) {
      horoscopeContent="When Leo and Scorpio start dating, they might not know exactly what they are to expect. This is in no way an easy relationship, and both partners can be stubborn and stiff in their opinions, life choices and ways they handle reality. If they want to remain in a loving relationship, they need to understand each other’s way of expressing emotions and respect each other’s needs however different they might be from those they are used to. When they find a way to love each other without conditioning, they might realize that they are in search for the same thing – Unity."
      return 29
    }

    // leo and sagitarrius match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 5 )) {
      horoscopeContent="Leo and Sagittarius are a very good fiery combination of signs, and when two people with these Sun signs come together, they inevitably fall in love. This love is warm, passionate and inspiring, and they will have a chance to create, perform and have fun together for as long as they feel this way. However, Sagittarius partner might lose interest in Leo because they tend to get pushed away by their static, fixed nature. The only way they might get to keep their passion and emotions going, is if they manage to listen to their softer emotions and remain tender and sensitive for one another."
      return 75
    }

    // leo and capricorn match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 5 )) {
      horoscopeContent="If they meet in the right moment, Leo and Capricorn might get along very well. The main problem in their relationship is the set of priorities they might not share, and the passion or determination that both of them have. It is not an easy job, reconciling Saturn with the Sun, but it brings great benefits when it is done. The structure Leo could get and the creativity they might build on together could lift them to exactly what they desired, however their relationship might end. They differ as much as the Earth and the Fire, but when they share a common goal, they are unstoppable."
      return 27
    }

    // leo and aquarius match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 5 )) {
      horoscopeContent="Signs of Leo and Aquarius combined represent the ultimate creativity, famous scientific discoveries, the first man in an airplane and the first man on the Moon. Imagine what these partners could do together if they let each other lead the way when the territory of their rule is in front of them. They both need to learn to let go of the image they have about themselves and about each other, or they won’t get very far stuck in their unnecessary ego battle. Warm and cold, hearted and smart, nuclear gravitation and vacuum in space, it cannot be easy to mend their differences or form a stable, loving relationship. The best thing they could do is find a cause they will support together. This would give them a focus on the outer world and allow them to deepen the inner emotional world of their relationship while fighting outside of it."
      return 70
    }

    // leo and pisces match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 5 )) {
      horoscopeContent="Leo and Pisces seem to be put on this Earth to spread entirely different kinds of love. The problem isn’t in their element or their quality, as much as it is in their connection through the fall of Neptune, the ruler of Pisces. If they get attracted to each other, they will be subjected to the risk of great damage to their beliefs, their inner faith and usually succumb to mutual disrespect because of a simple lack of understanding. The beauty of their relationship could be developed through the fairytale approach of Pisces, if they build the heroic image of their Leo partner to the point in which other differences between them fade."
      return 14
    }



    // virgo and virgo match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 6 )) {
      horoscopeContent="When Virgo decides to be with another Virgo, we can assume that their relationship is a product of one of two possible things, the first one being the need for stability and their rational decision to be with one another, and the second one being the unexplainable force of love at first sight. Whatever the case, both partners are quite rational and belong to the sign of mutable quality, so their emotions can change very fast. Because of their shared tendency for sacrifice, the lack of faith they have in themselves, and the tendency to rationalize everything with value, they might easily end up in a relationship where none of the partners is actually in love, or satisfied. It is imperative for them to act according to their hearts if they want their love to last."
      return 65
    }

    // virgo and libra match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 6 )) {
      horoscopeContent="Virgo and Libra can form a very satisfying intellectual bond, for as long as they respect each other’s feelings. In general, this relationship can sometimes work, and these partners can synchronize their pace, choose appropriate activities and build a satisfying sex life with enough patience and care. They could have a deep problem with emotional understanding though, and the thing they will find most difficult to reconcile is their fragile egos. Virgo, willing to please, will easily take over the responsibilities and decisions that Libra needs to take on. This will lead to a feeling of inferiority in Libra and the loss of respect toward their Virgo partner. If this issue is left unresolved, their relationship might end because of disrespect they were both unaware of in the beginning."
      return 30
    }

    // virgo and scorpio match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 6 )) {
      horoscopeContent="That changeable nature of Virgo will be settled down by the fixed quality of their Scorpio partner, who will keep their relationship exciting for a very long time. In general, there is a problem that these partners share when it comes to Venus, and their relationship is often a reflection of these troubles. This can lead to all sorts of emotional blackmail, their tendency to control each other’s lives, and if not this, than constant criticism that makes them both feel guilty or simply sad. The best thing they can do is decide that they will value each other and be thankful for each other in this relationship. If they develop a strong sense of gratitude, their relationship might be extremely deep, exciting and truly appreciated by both partners."
      return 76
    }

    // virgo and sagitarrius match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 6 )) {
      horoscopeContent="The relationship between a Virgo and a Sagittarius is not a usual happy ending emotional story. There are many challenges in their way, the biggest being their emotional lack of understanding and their possible lack of respect. Still, when they find a way to show emotions and share them in the same pace and in an understandable way, they could actually have a lot of fun together. Their communication is often exciting and they both have a lot to say to each other, but their rationality may distract them from an actual search for love. If they discover how well they complement each other, they might be able to stay together for a long time."
      return 32
    }

    // virgo and capricorn match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 6 )) {
      horoscopeContent="Virgo and Capricorn belong to the element of Earth and follow each other’s pace perfectly. Even if everything between them seems too slow for some other zodiac signs, they build respect, trust and love, on the foundation of mutual analysis and detailed examination. The search for perfection can be ended in this relationship, for they give each other enough time, and listen to each other well enough to meet the expectations that need to be met. Both of these partners can be stiff and lose sight of the importance of the emotional, mellow approach to life, and this relationship can make them rough and too strict. Still, in most cases, they will give each other enough time to grow out of this and grow old together."
      return 77
    }

    // virgo and aquarius match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 6 )) {
      horoscopeContent="Virgo can represent everything that Aquarius runs from – practical, worried about health and earthly things, down to Earth, cleaning obsessed maniac. Imagine how incredibly irresponsible, chaotic and unrealistic Aquarius looks to them. Their strongest meeting point is in their rationality and communication, and this can be used to overcome many problems that their differences result in. Unfortunately, in most cases they will not have enough chemistry to start a relationship, let alone stay in a sexually satisfying one for very long. If they take each other seriously, they might create incredible things together, as their great minds merge."
      return 30
    }

    // virgo and pisces match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 6 )) {
      horoscopeContent="Virgo and Pisces represent the axis of the exaltation and fall of both Venus and Mercury. This makes them partners with greatest challenges and the greatest potential for love in the entire zodiac. They need to find a fine balance of rationality and emotions, each one individually and together through their relationship. In many cases this is not a couple that will last very long, as their mutable quality makes them changeable enough to disregard the entire relationship quickly if they aren’t satisfied. They need to realize that perfection they seek might not be presented in the form they expect. If they stay together for long enough to understand the benefits of their contact, they might discover that the love between them is the only true love they could find in this lifetime."
      return 86
    }



    // libra and libra match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 7 )) {
      horoscopeContent="The sign of Libra is a sign of relationships and they often have a mission to teach others about relating to one another. When two Libras start dating, it might be difficult for them to find a purpose of their contact, for they both seem to share a mission and a goal that is connected to other people. If they find a meeting point, combining their activities and sticking to their shared values, they will have a tendency to become a perfectly balanced couple. The only thing missing in both of them, very hard to develop, is the sense of mutual respect with no passive judgment or expectations. Both of them are susceptible to this problem with their surroundings, and when together, these problems will easily multiply. If they let each other be who they are, they might become an inspiration for all of us, teaching us what a productive relationship really is."
      return 68
    }

    // libra and scorpio match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 7 )) {
      horoscopeContent="The relationship of Libra and Scorpio is in no way easy and light. Both of these partners will have to face their dark sides through this bond, and although this can lead to an incredible and intense sex life, and emotions that no one else can understand, it might lead them both to a depressive hole they won’t easily get out of. The only way for this couple to last in a satisfying and gentle relationship, is for both partners to build a strong individual, independent life, or they will get sucked into the whirlpool of karmic emotions and obsessive, negative expectations."
      return 29
    }

    // libra and sagitarrius match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 7 )) {
      horoscopeContent="The relationship of Libra and Sagittarius is in most cases a beneficent bond that allows these partners to develop their emotional, inner worlds and build their lives without negative influences. However, there is an archetypal battle between them, for Saturn exalts in Libra and doesn’t really care for his son, Jupiter, the ruler of Sagittarius. This could easily lead to a struggle for supremacy and a battle to reach the ruling position among them. This comes as a continuation of Libra’s bruised Sun and a Sagittarius will fit in perfectly with the need to give away every sense of pride out of some childish convictions. The only way for them to be happy together, is to respect each other fully and let each other do what they are meant to do. Libra should stick to their relationship and love, ruled by Venus, while Sagittarius should stick to their convictions and width, ruled by Jupiter, multiplying the love Libra provides."
      return 71
    }

    // libra and capricorn match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 7 )) {
      horoscopeContent="If we want to choose the best word to describe the relationship between a Libra and a Capricorn partner, we would have to say – hard. This doesn’t mean they won’t enjoy the trouble of being together, or stay in a relationship for a very long time, but this is most certainly not a bond that many other signs would engage in. Their biggest challenge is the lack of respect for emotional value that is usually initiated by Capricorn, but easily continued by Libra. If they find a way to share, show and understand each other’s emotions, everything else will seem like a piece of cake."
      return 34
    }

    // libra and aquarius match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 7 )) {
      horoscopeContent="There is a strong understanding between a Libra and an Aquarius partner due to their shared element of Air. Still, it can be quite difficult for their troubled Suns to get along and they will often have difficulty adjusting to each other’s character and finding deep respect for one another. The best cure for any problem in their relationship is usually in time, but with Aquarius’ need for spontaneity they often won’t last long enough for time to mend what gets broken. Whatever their story, they will have a lot of exciting things to live through together and if they fall in love, it would be a shame for a couple such as this one, not to give their relationship a try however it might end."
      return 68
    }

    // libra and pisces match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 7 )) {
      horoscopeContent="Libra and Pisces have a meeting point in the beauty of Venus. Still, they perceive it in two different ways and they will often not respect each other enough to find the beauty of Venus in one another. They could have real trouble adjusting to their partner’s speed, and the mutable quality of Pisces often won’t help them open up any faster to build a relationship in the pace that would fit their Libra partner. Both Libra and Pisces can selflessly be interested in the satisfaction of their partner, and this should help them stay on the good side of their relationship whatever happens between them. If they move past the disrespect and the unrealistic expectations from each other’s personalities, they might find that they share real love."
      return 29
    }




    // scorpio and scorpio match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 8 )) {
      horoscopeContent="Scorpio and Scorpio have this tendency to bring out the worst in each other. Even though they can share the deepest understanding known to the entire zodiac, they can also get too dark and depressed together, sinking into their pool of unresolved emotions. Their emotional understanding is something worth cherishing, if they are both open for their own feelings and accept their own inner needs."
      return 66
    }

    // scorpio and sagitarrius match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 8 )) {
      horoscopeContent="Scorpio and Sagittarius make a pretty great couple, for as long as they feel the first excitement at the start of their relationship. While they don’t know each other well and everything seems new and incredible, Scorpio will see their Sagittarius partner as a ray of light that suddenly makes their life brighter and better, while Sagittarius will see that there is so much to learn and enjoy the depth of their Scorpio partner, followed by emotional attachment. In time, there is a strong chance they will slowly lose interest in one another, especially the mutable sign of Sagittarius for their fixed Scorpio partner. Even though their relationship might end on bad terms, it would be a shame not to give in to it and let it fascinate and exalt both of them for however long."
      return 30
    }

    // scorpio and capricorn match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 8 )) {
      horoscopeContent="The relationship of Scorpio and Capricorn can be inspiring for both partners to search for the truth, dig up under their family tree and deal with any unresolved karma and debt. They are both deep and don’t take things lightly, and this will help them build a strong foundation for a relationship that can last for a long time. However, this exact thing can easily make their relationship too dark and unemotional, pull them both in a state of sadness and depression, or simply awaken their need to search for the light with someone else."
      return 64
    }

    // scorpio and aquarius match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 8 )) {
      horoscopeContent="Someone might say that this is a karmic relationship, that these partners were enemies in one of their previous lives and that they could fight until one of them falls dead. This would be a bit extreme though. The truth is, Scorpio is the sign of Uranus’ exaltation and as such, it adores Aquarius in a way. In most cases, Scorpio partner will show their affection obsessively, but this might actually feel good for Aquarius. When we look at the sign of Aquarius, we will see that it exalts Neptune, the ruler of a Water sign of Pisces, and all of our assumptions on their lack of emotionality will drown in their ultimate love. The fact is they are both in a way outcasts and rebels. While Scorpio represents all of our emotions we don’t want to deal with, Aquarius represents the way of thinking most of us are not ready for. It is best to look at them as announcers of change, for this is exactly what they will bring into each other’s lives."
      return 30
    }

    // scorpio and pisces match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 8 )) {
      horoscopeContent="When Scorpio and Pisces come together, this relationship will probably give them both new insights on emotional possibilities. They will both easily get carried away into an image of a fairytale love, and this image could keep them together for a very long time, even if they are both not that happy. As two Water signs, they will rely on their emotional judgments and understand this about each other, creating true intimacy. The challenge here is for the nature of Scorpio not to obsess and suffocate their changeable partner, and for Pisces to stop running away from negative emotions."
      return 81
    }


    // sagitarrius and sagitarrius match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 9 )) {
      horoscopeContent="One Sagittarius will easily fall in love with the other and their passionate relationship can change very fast. As two representatives of a mutable sign, they will adapt easily, but change their opinions and feelings toward each other with a similar ease. This doesn’t always bring promise of a long-term relationship, for there is no partner to be the glue that holds them together. This doesn’t mean they won’t enjoy each other’s company, find many things to share while they are together, and laugh as children while being on the same path. If they discover the true happiness of two Jupiter affected people combined, they might lose interest in everyone else and find that point of needed balance to keep them together in their travels for as long as they live."
      return 74
    }

    // sagitarrius and capricorn match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 9 )) {
      horoscopeContent="This is not your ideal relationship, and it will rarely be the one they both choose to stay in for the rest of their lives. Still, their understanding and acceptance of their differences is refreshing and fun for both partners, and they might have a good time while together, for however long. We cannot predict too much stability unless a Capricorn decides to make it, but the smile on Sagittarius’ face and the ability they have to make their partner laugh, can be the pillar of their bond for as long as they both need it."
      return 38
    }

    // sagitarrius and aquarius match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 9 )) {
      horoscopeContent="A relationship between a Sagittarius and an Aquarius partner might seem like a same sex friendship to other people and whatever they might think of this, this is the type of relationship both of these partners might need. They will get together when it is time for both of them to go through a change in their lives or leave a partner they feel restricted with. Their relationship is often a shiny beacon to everyone around them because it gives priority to the future and brings hope of a better time. The main challenge of Sagittarius and Aquarius lies in their rational natures. Although their minds will have a wonderful relationship, they could have trouble reaching real intimacy and closeness. They both need to slow down and ask themselves how they feel before they end up in a heartless bond they find solace in as they run away from the world."
      return 83
    }

    // sagitarrius and pisces match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 9 )) {
      horoscopeContent="This is a relationship of two kindred spirits that often doesn’t last very long. At first, it will be challenging for them to leave the platonic zone and start building a physical relationship. Once they get close to each other, their process of learning will begin and both partners will be fascinated by each other, thinking that their relationship could never end. They will easily idealize each other, think of their relationship as the perfect love, but this infatuation won’t last very long because of their changeable natures. The fact is their relationship represents a moment in time when they have both deserved to smile. For as long as it lasts and they are happy, it will be cherished by both of them."
      return 50
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
