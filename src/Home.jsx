import React from 'react';
import Hero from './components/Hero';
import ThemeToggle from './components/ThemeToggle';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import RelationshipTimer from './components/RelationshipTimer';
import Reasons from './components/Reasons';
import BirthdayMoon from './components/BirthdayMoon';
import RelationshipQuiz from './components/RelationshipQuiz';
import DateScheduler from './components/DateScheduler';
import Section from './components/Section';
import Footer from './components/Footer';
import LoveLetter from './components/LoveLetter';

const Home = () => {
    return (
        <div className="relative z-10">
            <ThemeToggle />
            <Hero />

            <Section>
                <RelationshipTimer />
            </Section>

            <Section>
                <BirthdayMoon />
            </Section>

            <Section>
                <RelationshipQuiz />
            </Section>

            <Section>
                <DateScheduler />
            </Section>

            <Section>
                <Timeline />
            </Section>

            <Section>
                <Reasons />
            </Section>

            <Section>
                <LoveLetter />
            </Section>

            <Section>
                <Gallery />
            </Section>

            <Footer />
        </div>
    );
};

export default Home;
