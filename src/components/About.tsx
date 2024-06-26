import { FC } from 'react'

import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import SectionWrapper from './utils/SectionWrapper'

type ServiceCardProps = {
    index: number
    title: string
    icon: string
}

const ServiceCard: FC<ServiceCardProps> = ({ index, title, icon }) => (
    <Tilt className="xs:w-[250px] w-full">
        <motion.div
            variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
            className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
        >
            <div
                data-options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                }}
                className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
            >
                <img
                    src={icon}
                    alt="web-development"
                    className="w-16 h-16 object-contain"
                />

                <h3 className="text-white text-[20px] font-bold text-center">
                    {title}
                </h3>
            </div>
        </motion.div>
    </Tilt>
)

const About = () => (
    <SectionWrapper idName="about">
        <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Overview.</h2>
        </motion.div>

        <motion.p
            variants={fadeIn('left', '', 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
           As a junior .NET developer proficient in C#, ASP.NET MVC, .NET Core, and Web API,
            along with skills in HTML, CSS, jQuery, MSSQL, JavaScript, AngularJS, and WPF, 
            I specialize in crafting innovative solutions that address real-world challenges.
             I'm dedicated to collaborating closely with clients to deliver efficient, scalable,
              and user-friendly software products. Let's team up to transform your concepts into reality!
        </motion.p>

        <div className="mt-20 flex flex-wrap gap-10">
            {services.map((service, index) => (
                <ServiceCard key={service.title} index={index} {...service} />
            ))}
        </div>
    </SectionWrapper>
)

export default About
