import img from '../../../Assets/Images/events.jpg'
import Personal from '../../../Assets/Images/Umeet/Personal/Personal.png'
import Public from '../../../Assets/Images/Umeet/Public/Public.png'
import Political from '../../../Assets/Images/Umeet/Political/Political.png'
import ReUnionPersonal from '../../../Assets/Images/Umeet/Personal/Re-Union Circle.png'
import BirthdayPersonal from '../../../Assets/Images/Umeet/Personal/Birthday Circle.png'
import MarriagePersonal from '../../../Assets/Images/Umeet/Personal/wedding-circle-icon.png'
import AnniversaryPersonal from '../../../Assets/Images/Umeet/Personal/annivasary-circle-icon.png'
import BabyShowerPersonal from '../../../Assets/Images/Umeet/Personal/Baby Shower Circle.png'
import OthersPersonal from '../../../Assets/Images/Umeet/Personal/others-circle-icon.png'

import PartyFeedbacksPolitical from '../../../Assets/Images/Umeet/Political/party Feedback-circle-icon.png'
import PartyCandidatesFeedbackPolitical from '../../../Assets/Images/Umeet/Political/party-candidate-feedback-circle-icon.png'
import PartyMeetingPolitical from '../../../Assets/Images/Umeet/Political/party-meeting-circle-icon.png'
import PoliticalPolitical from '../../../Assets/Images/Umeet/Political/political-circle-icon.png'

import productLaunchPublic from '../../../Assets/Images/Umeet/Public/product-launch-circle-icon.png'
import PublicFeedbackPublic from '../../../Assets/Images/Umeet/Public/Public Feedback.png'
import publicPublic from '../../../Assets/Images/Umeet/Public/public-circle-icon.png'
import publicMeetingPublic from '../../../Assets/Images/Umeet/Public/public-meeting-circle-icon.png'
import publicOtherPublic from '../../../Assets/Images/Umeet/Public/public-other-circle-icon.png'
import shopOpeningPublic from '../../../Assets/Images/Umeet/Public/shop-opening-circle-icon.png'

export const dataList = [
 {
 	img: img,
 	title: 'Moon Light Dinner',
 	time: '15th Jan 2023',
 	host: 'John Smith',
 	status: 'Attending'
 },
 {
 	img: img,
 	title: 'Moon Light Dinner',
 	time: '15th Jan 2023',
 	host: 'John Smith',
 	status: 'Pending'
 },
 {
 	img: img,
 	title: 'Moon Light Dinner',
 	time: '15th Jan 2023',
 	host: 'John Smith',
 	status: 'Not Attending'
 },
 {
 	img: img,
 	title: 'Moon Light Dinner',
 	time: '15th Jan 2023',
 	host: 'John Smith',
 	status: 'Completed'
 },
 {
    img: img,
    title: 'Moon Light Dinner',
    time: '15th Jan 2023',
    host: 'John Smith',
    status: 'Completed'
 },
 {
    img: img,
    title: 'Moon Light Dinner',
    time: '15th Jan 2023',
    host: 'John Smith',
    status: 'Completed'
 },
]

export const myEventDataList = [
 {
  img: img,
  title: 'Moon Light Dinner',
  time: '15th Jan 2023',
  host: '',
  status: ''
 },
 {
    img: img,
    title: 'Moon Light Dinner',
    time: '15th Jan 2023',
    host: '',
    status: 'Completed'
 },
 {
    img: img,
    title: 'Moon Light Dinner',
    time: '15th Jan 2023',
    host: '',
    status: 'Completed'
 },
]
export const selectEventList = [
 {
   img: Personal,
   title: 'Personal',
   events: 'Birthday, ReUnion, Anniversary etc.. With Friends, Relatives, Classmates & Officemates'
 },
 {
   img: Public,
   title: 'Public',
   events: 'Shop Opening, Product Launch, Public Meetings etc.. By City, State & Country'
 },
 {
   img: Political,
   title: 'Political',
   events: 'Party Meeting, Feedbacks With Party or Candidates etc.. By Assembly, Lok Sabha, State & Country'
 },
]

export const selectPersonalEventType = [
 {
   img: ReUnionPersonal,
   event: 'Re-Union'
 },
 {
   img: BirthdayPersonal,
   event: 'Birthday'
 },
 {
   img: MarriagePersonal,
   event: 'Wedding'
 },
 {
   img: AnniversaryPersonal,
   event: 'Anniversary'
 },
 {
   img: BabyShowerPersonal,
   event: 'Baby Shower'
 },
 {
   img: OthersPersonal,
   event: 'Others'
 },
]

export const selectPublicEventType = [
 {
   img: shopOpeningPublic,
   event: 'Shop Opening'
 },
 {
   img: productLaunchPublic,
   event: 'Product Launch'
 },
 {
   img: PublicFeedbackPublic,
   event: 'Public Meeting'
 },
 {
   img: publicMeetingPublic,
   event: 'Public Feedback'
 },
 {
   img: publicOtherPublic,
   event: 'Others'
 },
]

export const selectPoliticalEventType = [
 {
   img: PartyMeetingPolitical,
   event: 'Party Meeting'
 },
 {
   img: PartyFeedbacksPolitical,
   event: 'Party Feedback'
 },
 {
   img: PartyCandidatesFeedbackPolitical,
   event: 'Party Candidate Feedback'
 },
 // {
 //   img: PoliticalPolitical,
 //   event: 'Political'
 // }
]