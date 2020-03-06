import React, {useState} from 'react'
if (typeof window !== 'undefined') {
  require('./Profile.css')
}

const Profile = (props) => {
  // const style = useStyle()

  return (
    <div className="profile">
      <div className="profileImage">
        {/* <img 
          className="imageProfile" 
          src={imageProfile}
          alt="profile image"
        ></img> */}
      </div>
      <div className="content">
        {/* <span>
          Hi, I am Joanne, was an illustrator for children's books in South Korea, enjoying country like lifestyle here in Wairarapa, New Zealand, love to share some of my works. Enjoy!
        </span>
        <ul>
          <li>Illustrator at Dongsuh Publishing Company, 1986-88</li>
          <li>Personal exhibition at Seoul, 1989</li>
          <li>Freelance illustrator for children's books, magazines and postcards, 1989-99</li>
        </ul> */}

        <p>
          Having moved from Seoul, South Korea - a city of 10 million - to Auckland, New Zealand, in 2000, Joanne Lee’s life changed dramatically. Suddenly thrust into a new culture, with three young children to raise, it was a challenging time. In 2004 she moved with her family to the Wairarapa, and thus began her “country life”. In Korea Joanne was an accomplished artist and children’s book illustrator. Living in a high rise building apartment in Korea, there was not much scope for gardens, but during her daily walks in Masterton, she noticed the wealth of flowers around her, and took photos of them. These formed the basis of her beautiful floral confections of art.
        </p>
        <p>
          In Korean culture, flowers are very symbolic, for example the peony is a symbol of wealth. The lotus represents peace of mind and meditation. White chrysanthemums symbolize integrity. Cherry blossom is also popular in springtime and stands for purity and beauty. The custom of including these flowers in Korean art is a long established tradition, and Joanne was inspired to give rein to her creative urges, incorporating traditional Korean style, and drawing on her background in graphic design and lettering, and illustration. Apart from floral motifs, Joanne likes bold Russian Faberge eggs and Babushkas. Hungarian embroidery and Maori patterns fascinate her as she fuses diverse cultural references. She paints in the traditional Korean style, using balance in her structuring. Animals and flowers and lettering feature prominently. She loves bright colours and mixing patterns which almost have a textile or wrapping paper style. This leads to a versatile body of work that can be grouped together or individually.
        </p>
        <p>
          For an immigrant who did not yet know many people, painting was a means of combatting lonely hours in a new environment, and getting to know the flora of her adopted country. It gave her an outlet for her talents, and a means to decorate her house with beauty, creating her own “garden in the house”, and expressing her creativity, at a time when communicating with others was limited . It was a kind of “therapy” for a shy, talented individual, who wanted to find her voice, in the midst of isolation and change. She says it has given her back her sense of self-worth and confidence. As she began to speak more English and establish some contacts, her wonderful paintings did not go unnoticed. She shared her gifts, and began exploring new avenues such as making lovely embroidered felt brooches, painting pop art portraits of friends, and colleagues at Trade Aid, where she has volunteered for over 7 years. She also paints furniture and has done some wonderful artworks for Rathkeale school balls.
        </p>
        <p>
          Joanne likens living in the Wairarapa, to experiencing the true essence of New Zealand. It was hard at first, but she acknowledges that in Auckland she would not have had to work too hard at learning English, or making Kiwi friends, because of the large Korean community already there. Here in the Wairarapa she is much loved by her friends for her lovely, generous and kind nature, her wonderful Korean cooking, and her many artistic talents which have enhanced our lives.
        </p>
        <p className="by">
          <i>by friend Lisa</i>
        </p>
      </div>
    </div>
  )
}

export default Profile
/*
const useStyle = () => {
  const [style, setStyle] = useState({})

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches
  const toggleState = (event) => { // only for touch device
    const isPaused = !style.animationPlayState || style.animationPlayState === 'paused' 
    const play = isPaused ? 'running' : 'paused'
    //console.log('toggleState', play)
    setStyle({ animationPlayState: play })
  }

  const returnObject = {style}
  if (isTouchDevice) {
    returnObject['onClick'] = toggleState
  }

  return returnObject

  // return {
  //   style,
  //   onClick: isTouchDevice ? toggleState: null
  // }
}
*/