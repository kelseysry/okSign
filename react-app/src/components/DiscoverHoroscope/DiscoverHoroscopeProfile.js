
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
      return 70
    }

    // aries and aries match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 1 )|| (+userHoroscopeId === 1 && +matchHoroscopeId === 1 )) {
      horoscopeContent ="When two Aries come together, it is imperative for at least one of them to have mastered the art of staying calm. If this is achieved by one of them, not through passive aggression but through rational thought, their relationship can be truly rewarding. As two warm and passionate people, they can share many adventurous moments that raise their energy levels sky high. If, however, none of them has this rational, grown-up ability, it is only possible to prolong their relationship based on superficial activities and sex, of course. Since the sign of Aries takes Saturn, the wise ruler of time, patience and responsibility to its detriment, one of these partners will have to learn their lesson and take responsibility for the future of their relationship if they are to last in time."
      return 60
    }

    // aries and taurus match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 2 )|| (+userHoroscopeId === 2 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This is a relationship full of personal challenges and individual depth. If they want to succeed as a couple, many internal issues in both must be solved. Only if they both accomplish peace in their lives, have just enough education, just enough other relationships and acquired just enough humor, they might be able to put aside their differences and listen to each other well enough. It is not that hard, except when you are used to using your horns."
      return 60
    }

    // aries and gemini match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 3 )|| (+userHoroscopeId === 3 && +matchHoroscopeId === 1 )) {
      horoscopeContent = "The overall impression of this couple would be good, exciting and challenging, a relationship where both partners can learn a lot and be active in a healthy way. The main problem with their romantic involvement is the lack of trust, especially if Aries partner gets too attached to Gemini, always fighting for their freedom. The need for conversation with a lot of essence is bigger than any positive or any negative aspects of their relationship and both of them should always have this in mind. In general, there is a big chance these two will end up together, because their shared love of adventure is bigger than most of their troubles."
      return 70
    }

    // aries and cancer match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This relationship can be painful for both partners and needs a lot of work put into it in order to work. It requires both of the partners to adapt and make changes in their behavior, while tip toing around each other most of the time. It is not an easy road, but the rewards are such inner understanding of passion, full of emotion and the ability to create something truly unique. If they succeed, they will probably never be satisfied with a different partner."
      return 65
    }

    // aries and leo match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 1 )) {
      horoscopeContent="The relationship of Aries and Leo is passionate and turbulent, but they don’t seem to mind an occasional fight and a sharp word. When they fall in love deeply, they are almost impossible to separate as they stubbornly hold on to the idea of their future together. Although they are not two of the most romantic believers in love, they are passionate in their beliefs and when they find love, they will fight for it until there is literally nothing left of their relationship. It is meaningless to advise gentle behavior or looking for peace, because the entire world of their relationship is based on the element of Fire they share. It is pointless to look for peace, when the opposite of peace is what attracts them in the first place. For as long as they love each other and stay faithful and true, they will be tied up in a relationship they need to fight for every day. Their main objective is to find a way to enjoy the fight and have fun."
      return 90
    }

    // aries and virgo match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 1 )) {
      horoscopeContent="It’s a good thing that the relationship between an Aries and a Virgo is never boring. Although in most cases they are not really meant to last, it can still be a fun experience if none of them takes their potential for a shared future too seriously. In case they take the best out of their relationship, giving it enough freedom and unpredictability, Virgo would incorporate some of Aries’ energy, while Aries would allow Virgo to teach them how to organize their thoughts and communicate calmly. This way they might come to the point where their relationship could actually last, and the outcome depends on their ability to relax and have fun together."
      return 45
    }

    // aries and libra match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 1 )) {
      horoscopeContent="However difficult it might be to reconcile these two natures, remember that this is a primal opposition that represents partners by signification. Aries and Libra are the couple of the zodiac, as much as any other opposing signs, for they are each other’s seventh house, house of relationships. Even more so if we acknowledge the fact that Libra is the sign of relationships in general. Any problem they might have with each other is something to be worked on, because it shows what their personal problem with any relationship is. When they are madly attracted to each other and fall in love, there is almost nothing that could separate them, no matter the differences. Wouldn’t we all like to find the middle ground with our loved one? They need to work on their bond, that’s a fact, but their relationship is a promise of a perfect fit of two souls meant to be together."
      return 70
    }

    // aries and scorpio match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 1 )) {
      horoscopeContent="Think of this combination of signs through the most aggressive image of Fire and Water element. Fire evaporates Water, just like Aries shatters Scorpio’s feelings. Water damps down Fire, just like Scorpio wears Aries out. They seem to bring out the worst in each other and this is nobody’s fault, it is just hard to reconcile so much focused energy that moves in two different directions. Their relationship is like the process of nuclear fusion and often just too much to handle."
      return 80
    }

    // aries and sagitarrius match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This is definitely a couple with lots of potential. They might have to stand up to their environment and defend their feelings from others, but this won’t shake them too much, for neither of them thinks that much about the opinion of others anyway. If they manage to mend their philosophical differences and respect each other’s different opinions, they could become one of the warmest relationships in the zodiac. Their main relationship advice would be to always tell the truth to each other and not go crazy about their healthy differences. Their differences are exactly the thing that could make their sexual life more exciting."
      return 90
    }

    // aries and capricorn match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This is not an easy relationship. None of the partners has any trace of lightness and blissful ignorance. This is why their relationship might seem like a competition to ruin the relationship in the best possible way. It is hard to say who will get out of it a winner, for they will both feel lousy most of the time and be relieved that they finally separated. If they stubbornly decide they love each other too much to let each other go, both of them would probably bang their heads against a wall for years to come. Their only chance of success is unconditional respect and the wideness of their views and expectations. They could truly complement each other, but only in a scenario where they would look for good in one another and highlight each other’s qualities. Unfortunately, the malefic nature of their rulers rarely allows for them to be this positive and acceptance oriented. If they got together, and whatever their story is, they should think about the things they could learn from each other instead of looking for each other’s shortcomings, and always stay out of each other’s business."
      return 50
    }

    // aries and aquarius match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This is a couple that lacks tenderness. They are not two brutes who let their relationship fade as soon as their passion does, but the distant examining look of Aquarius can take out the emotion out of it. Aries partner needs to be relaxed by their significant other, so they can melt down and show their true, warm emotional nature. In this relationship, they would have a distant partner that basically supports their primal, instinctive nature. Although it is nice to think that the point of each relationship is for partners to accept each other as they are, in this case that would take away every chance for an Aries to grow through togetherness and learn about their emotional nature. This is something they will never be satisfied with. Still, every relationship with Aquarius can surprise us as much as any individual Aquarius could. With them as a partner, there is always room for an enlightening scenario that leaves all things to free will. In case they decide to share their lives together, they should have a screaming room they could individually visit once in a while. This would probably do the trick. And about that lack of emotion, they could just put in a lot of physical tenderness to begin with and let things go from there."
      return 55
    }

    // aries and pisces match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 1 )) {
      horoscopeContent="This is a relationship disturbed mostly by the lack of trust and the ability of both parties to open up to their partner. Aries is ruled by Mars, the planet that rules our first chakra, responsible for our ability to set good boundaries. Pisces is ruled by Neptune, in charge of our entire aura and our permeability for outside stimuli. Since they are both responsible for our border with the outside world, it is hard to say which partner should loosen up and make it possible for them to come close. Their only chance of a happy ending is if Aries partner dives in and their Pisces partner wakes up."
      return 65
    }




    // Taurus and Taurus match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 2 )|| (+userHoroscopeId === 2 && +matchHoroscopeId === 2 )) {
      return 70
    }
    // Taurus and gemini match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 3 )|| (+userHoroscopeId === 3 && +matchHoroscopeId === 2 )) {
      return 70
    }

    // Taurus and cancer match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 2 )) {
      return 80
    }

    // Taurus and leo match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 2 )) {
      return 70
    }

    // Taurus and virgo match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 2 )) {
      return 90
    }

    // taurus and libra match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 2 )) {
      return 75
    }

    // taurus and scorpio match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 2 )) {
      return 85
    }

    // taurus and sagitarrius match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 2 )) {
      return 50
    }

    // taurus and capricorn match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 2 )) {
      return 95
    }

    // taurus and aquarius match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 2 )) {
      return 80
    }

    // taurus and pisces match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 2 )) {
      return 85
    }



    // gemini and gemini match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 3 )|| (+userHoroscopeId === 3 && +matchHoroscopeId === 3 )) {
      return 75
    }

    // gemini and cancer match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 3 )) {
      return 60
    }

    // gemini and leo match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 3 )) {
      return 80
    }

    // gemini and virgo match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 3 )) {
      return 75
    }

    // gemini and libra match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 3 )) {
      return 90
    }

    // gemini and scorpio match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 3 )) {
      return 60
    }

    // gemini and sagitarrius match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 3 )) {
      return 76
    }

    // gemini and capricorn match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 3 )) {
      return 50
    }

    // gemini and aquarius match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 3 )) {
      return 90
    }

    // gemini and pisces match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 3 )) {
      return 50
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
