import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


// terminal server code: $env:Path = "C:\Program Files\nodejs;$env:Path"; & "C:\Program Files\nodejs\npx.cmd" serve .

export const tweetsData = [
    {
        handle: `@TrollBot66756542 💎`,
        profilePic: `images/troll.jpg`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices.
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    },
    {
        handle: `@Elon ✅`,
        profilePic: `images/musk.png`,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
        replies: [
                  {
                handle: `@TomCruise ✅`,
                profilePic: `images/tcruise.png`,
                tweetText: `Yes! Sign me up! 😎🛩`,
                uuid: uuidv4()
            },
                  {
                handle: `@ChuckNorris ✅`,
                profilePic: `images/chucknorris.jpeg`,
                    tweetText: `I went last year😴`,
                uuid: uuidv4()
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    },
        {
        handle: `@NoobCoder12`,
        profilePic: `images/flower.png`,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower ☣️`,
                profilePic: `images/overflow.png`,
            tweetText: `No. Obviosuly not. Go get a job in McDonald's.`,
              uuid:  uuidv4(),
            },
            {
                handle: `@YummyCoder64`,
                profilePic: `images/love.png`,
              tweetText: `You are wonderful just as you are! ❤️`,
                uuid: uuidv4()
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    },
]

// function handleAddReply(tweetid) {
//   // get textarea element value
//   const replyTextValue =  document.getElementById(`reply-textarea-${tweetid}`).value

//   // push the value to the replies array



//   tweetsData.forEach(function (tweet) {

//     if (tweet.uuid === tweetid) {

//       tweet.replies.unshift({
//         handle: "@PrimeCraft",
//         profilePic: "images/scrimbalogo.png",
//         tweetText: replyTextValue,

//       })


//     }



//   })

//  render()
// }
//
//
//   let replyHtml =`


 // <div class="reply-container">

 //  <textarea placeholder="what is  on your mind, reply to ${tweet.handle}"  class="reply-textarea" id="reply-textarea-${tweet.uuid}"></textarea>
 //  <button class="reply-btn" data-reply-btn="${tweet.uuid}"  id="reply-btn-${tweet.uuid}"> Reply</button>

 //  </div> `
 //
 //  ${replyHtml}
