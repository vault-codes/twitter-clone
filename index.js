import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let activeTweetsData = []

handleStorageLoad()

document.addEventListener('click', function(e){


     if(e.target.dataset.like){
         console.log('LIKE CLICKED')
         handleLikeClick(e.target.dataset.like)
     }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
     else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }



    else if (e.target.dataset.replyBtn) {

      console.log('reply button clicked')
      handleAddReply(e.target.dataset.replyBtn)

     }

     else if (e.target.dataset.optionsMenu) {

       handleOptionsMenu(e.target.dataset.optionsMenu)

     }

     else if (e.target.dataset.tweetDelete) {
       console.log(e.target.dataset.tweetDelete)
      handleDeleteTweet(e.target.dataset.tweetDelete)
     }

     else if (e.target.dataset.close) {
       handleOptionsMenu(e.target.dataset.close)



  }

})

// document.addEventListener('dblclick', function(e){

//   if (e.target.dataset.reply) {
//     console.log(e.target.dataset.reply)
//   }
// })
//
//
 // place reply to tweet action handle here

// saving to local storage functionality

function handleStorageLoad() {



  const mySavedTweets = localStorage.getItem('mySavedTweets')

  if (mySavedTweets) {

    activeTweetsData = JSON.parse(mySavedTweets)


  }

  else {
    activeTweetsData = tweetsData

  }

  render()


}


function handleStorageSave() {


  localStorage.setItem("mySavedTweets", JSON.stringify(activeTweetsData))


  if (JSON.parse(localStorage.getItem("mySavedTweets"))) {
   activeTweetsData = JSON.parse(localStorage.getItem("mySavedTweets"))

  }

  else{
    activeTweetsData = tweetsData

  }



}


function handleOptionsMenu(tweetId) {



  console.log(document.getElementById(`options-${tweetId}`).classList.toggle('options-hide'))

}

function handleDeleteTweet(tweetid) {

  const targetTweetObj = activeTweetsData.filter(function (tweet) {
    return tweet.uuid !== tweetid
  })

  activeTweetsData = targetTweetObj
  handleStorageSave()
  render()

}




function handleAddReply(tweetId) {

  const replyTweetText = document.getElementById(`reply-text-${tweetId}`).value


  activeTweetsData.forEach(function (tweet) {
    if (tweet.uuid === tweetId) {
      tweet.replies.unshift({
        handle: '@Primecraft',
        profilePic: 'images/scrimbalogo.png',
        tweetText: replyTweetText
      })


    }

  })
    handleStorageSave()

    render()





 }

function handleLikeClick(tweetId) {

    const targetTweetObj = activeTweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++
    }
  targetTweetObj.isLiked = !targetTweetObj.isLiked
  handleStorageSave()
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = activeTweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
  handleStorageSave()
    render()
}

function handleReplyClick(replyId){
  document.getElementById(`replies-${replyId}`).classList.toggle('hidden')




}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        activeTweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
      handleStorageSave()
    render()
    tweetInput.value = ''
    }
}













// function handleModal(tweetId) {

//   document.getElementById(`modal-${tweetid}`).style.display = "block"

//   document.getElementById('').innerHTML = modalhtml


// }



function getFeedHtml() {
  let feedHtml = ``




  activeTweetsData.forEach(function (tweet) {

    let replyHtml = `
    <div class="reply-box">
    <textarea placeholder="whats on your mind, reply to ${tweet.handle}"
    class="reply-tweet-textarea" rows="5" data-reply-text="${tweet.uuid}" id="reply-text-${tweet.uuid}"></textarea>

    <button class="reply-btn" id="reply-btn" data-reply-btn="${tweet.uuid}"> Reply </button>

    </div>

    `

    // let optionHtml = `
    //         <div class="modal-inner" id="modal-inner">
    //           <button class="delete-tweet-btn" date-tweet-delete="${tweet.id}" id="delete-tweet-btn"> <i class="fa-solid fa-trash"></i> Delete tweet</button>

    //          </div>
    //   `








    let likeIconClass = ''

        if (tweet.isLiked){
            likeIconClass = 'liked'
        }

        let retweetIconClass = ''

        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''



        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
                  <div class="tweet-reply">





                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>`

            })
        }




        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>

                  <div class="options-hide" id="options-${tweet.uuid}">


                  <div class="modal-inner" id="modal-inner">
                  <i class="fa-solid fa-x" data-close="${tweet.uuid}"></i>

                    <button class="delete-tweet-btn" data-tweet-delete="${tweet.uuid}" id="delete-tweet-btn"> <i class="fa-solid fa-trash"></i> Delete tweet</button>
                   </div>
                  </div>
                    <div class="options-container">
                    <p class="handle">${tweet.handle}</p>
                    <i class="fa-solid fa-ellipsis" data-options-menu="${tweet.uuid}" id="options-menu-${tweet.uuid}"></i>
                    </div>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}"
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                    </div>
                  </div>
                  </div>
      <div class="hidden" id="replies-${tweet.uuid}">


        ${replyHtml}
        ${repliesHtml}
    </div>
    <div class="hidden blue-line" id="reply-tweet-${tweet.uuid}">



    </div>
    </div>
    </div>
      `
    })




   return feedHtml
}



function render() {

  document.getElementById('feed').innerHTML = getFeedHtml()

}

render()
