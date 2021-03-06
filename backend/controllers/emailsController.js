// const cron = require('node-cron');
const User = require('./../models/userModel')
const email = require('./../utils/email')

const sendEmails = async () => {
	try {
		const users = await User.find()
		users.forEach(user => {
			if (user.friends) {
				const friends = user.friends
				friends.map(async friend => {
					// console.log(friend);
					const date = new Date(friend.dateOfEvent)
          const curr = new Date()
					const currDate = curr.getDate()
          const currMonth = curr.getMonth()
					// console.log(date.getDate())
					// console.log(currDate)
					if (date.getDate() === currDate && date.getMonth() === currMonth) {
						// console.log(`Today is the ${friend.event} of the friend ${friend.name}.`)
						// await email(`${friend.event}`, friend, 'abcdefgh');
            await email('Wish', user, {title: `Friend's ${friend.event}`, friend})
            // console.log('email sent');
					}
				})
			}
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = sendEmails