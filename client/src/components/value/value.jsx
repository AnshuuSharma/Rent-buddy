import React from 'react'
import {Accordion,AccordionItem,AccordionItemHeading,AccordionItemButton,
    AccordionItemPanel,AccordionItemState
} from 'react-accessible-accordion';
import "react-accessible-accordion/dist/fancy-example.css";
import {MdOutlineArrowDropDown} from 'react-icons/md'
import './value.css'
import data from '../../utils/accordion';
const value = () => {
  return (
    <section className="v-wrapper">
        <div className=" innerWidth  v-container">
            {/* left */}
            <div className="flexCenter v-left">
                <div className="image-container">
                    <img src="./house.jpeg" alt='home'/>
                </div>
            </div>
            {/* right */}
            <div className="v-right">
                <span className="orangeText">Our Value</span>
                <span className="primaryText">Value we give to you</span>
                <span className="secondaryText">We strive to provide exceptional service and ensure that every listing meets our high standards for comfort and cleanliness.
                {/* We embrace technology and creativity to enhance the user experience, making the process of finding and renting rooms seamless and enjoyable. */}
                </span>

                <Accordion 
                className="accordion"
                allowMultipleExpanded={false}
                preExpanded={[0]}>
                    {
                        data.map((item,i)=>{
                            return(
                                <AccordionItem className="accordionItem" key={i} uuid={i}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            {/* <div className="flexCenter icon">
                                                {item.icon}
                                            </div> */}
                                            <span className="Text">{item.headings}</span>
                                            {/* <div className="flexCenter icon">
                                                <MdOutlineArrowDropDown size={20}/>
                                            </div> */}
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p className="secondaryText">
                                            {item.detail}
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            );
                        })
                    }
                   
                </Accordion>
            </div>
        </div>
    </section>
  )
}

export default value