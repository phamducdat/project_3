import React from 'react';
import { Briefcase, Facebook, GitHub, Instagram, Twitch, Twitter, Youtube } from 'react-feather';
import tw, { styled } from 'twin.macro';
import NavTop from '../../layout/components/NavTop/NavTop';
import { ProfileContextProvider } from './context';
import './style.css';
import useAuthen from '../../hooks/useAuthen'
const ContainerPage = styled.div`
${'' /* ${`background-image:url('https://source.unsplash.com/1L71sPT5XKc'); `}, */}
  ${tw`font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover`}
  `


const ImageContainer = tw.div`p-4 md:p-12 text-center lg:text-left`
const MainCol = tw.div`w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0`
const MobileView = styled.div`
${`background-image: url('https://source.unsplash.com/MP0IUfwrn0A')`},
  ${tw`block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center`}
`
const MainContainer = tw.div`max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0`
const H1Title = tw.h1`text-3xl font-bold pt-8 lg:pt-0`
const TitleContainer = tw.div`mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25`
const Title1 = tw.p`pt-4 text-base font-bold flex items-center justify-center lg:justify-start`
const Title2 = tw.p`pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start`
const Title3 = tw.p`pt-8 text-sm`
const ButtonContainer = tw.div`pt-12 pb-8`
const ButtonTouch = tw.button`bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full`
const MediaContainer = tw.div`mt-6 px-4 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between`
const ImgCol = tw.div`w-full lg:w-2/5`
const Avatar = tw.img`rounded-none lg:rounded-lg shadow-2xl hidden lg:block`

const ProfileImpl = () => {
  const {username} = useAuthen()
  return (
    <>
      <NavTop />
      <ContainerPage>
        <MainContainer>
          <MainCol>
            <ImageContainer>
              <MobileView />
              <H1Title>{username}</H1Title>
              <TitleContainer></TitleContainer>
              <Title1><Briefcase />&nbsp; &nbsp;What you do</Title1>
              <Title3>Totally optional short description about yourself, what you do and so on.</Title3>
            </ImageContainer>
            <MediaContainer>
              <Facebook />
              <Twitter />
              <GitHub />
              <Instagram />
              <Youtube />
              <Twitch />
            </MediaContainer>
            <ButtonContainer>
              <ButtonTouch>
                Manage your device
              </ButtonTouch>
            </ButtonContainer>
          </MainCol>

          <ImgCol>
            <Avatar className='avatar' src="https://source.unsplash.com/MP0IUfwrn0A" alt="avt" />
          </ImgCol>
        </MainContainer>

      </ContainerPage>
    </>
  )
}
const Profile = () => <ProfileContextProvider><ProfileImpl /></ProfileContextProvider>

export default Profile
