import React from 'react'
import './Contact.css';
import {MdCall} from 'react-icons/md'
import {BsFillChatDotsFill} from 'react-icons/bs'
import { HiChatBubbleBottomCenter } from 'react-icons/hi2';
const Contact = () => {
  return (
   <section className="flexCenter c-wrapper">
    <div className="innerwidth flexCenter c-container">
        <div className="flexColStart c-left">
            <span className="orangeText">Contact</span>
            <span className="primaryText">Easy to contact us</span>
            <span className="secondaryText">
            We'd love to hear from you! Whether you have questions about a rental listing, need assistance with your account, or want to know more about our services, we're here to help.
            </span>
            <div className="flexColStart contactModes">
                {/* first */}
                <div className="flexStart row">
                    <div className="flexColCenter mode">
                        <div className="flexStart">
                            <div className="flexCenter icon">
                                <MdCall size={25}/>
                            </div>
                            <div className="flexColStart detail">
                                <span className="primaryText">
                                    call
                                </span>
                                <span className="secondaryText">021 123 145 41</span>
                            </div>
                        </div>
                        <div className="flexCenter button">Call now</div>
                    </div>
                        
                 {/* second */}
                 <div className="flexColCenter mode">
                        <div className="flexStart">
                            <div className="flexCenter icon">
                                <BsFillChatDotsFill size={25}/>
                            </div>
                            <div className="flexColStart detail">
                                <span className="primaryText">
                                    chat
                                </span>
                                <span className="secondaryText">021 123 145 41</span>
                            </div>
                        </div>
                        <div className="flexCenter button">chat now</div>
                    </div>
                </div>

                {/* second row */}
                <div className="flexStart row">
                    <div className="flexColCenter mode">
                        <div className="flexStart">
                            <div className="flexCenter icon">
                                <BsFillChatDotsFill size={25}/>
                            </div>
                            <div className="flexColStart detail">
                                <span className="primaryText">
                                   video call
                                </span>
                                <span className="secondaryText">021 123 145 41</span>
                            </div>
                        </div>
                        <div className="flexCenter button">Video Call </div>
                    </div>
                        
                 {/* second */}
                 <div className="flexColCenter mode">
                        <div className="flexStart">
                            <div className="flexCenter icon">
                                <HiChatBubbleBottomCenter size={25}/>
                            </div>
                            <div className="flexColStart detail">
                                <span className="primaryText">
                                    message
                                </span>
                                <span className="secondaryText">021 123 145 41</span>
                            </div>
                        </div>
                        <div className="flexCenter button">Message now</div>
                    </div>
                </div>
            </div>
        </div>
        {/* image-section */}
        <div className="c-right">
            <div className="image-container">
                <img src="./contact.png" alt="house"/>
            </div>
        </div>
    </div>
   </section>
  )
}

export default Contact