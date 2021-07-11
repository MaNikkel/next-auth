import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useContext, useState } from 'react'

import { parseCookies } from 'nookies'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/Home.module.css'
import { withSSRGuest } from '../utils/withSSRGuest'

export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('mathias@nikkel.com')
  const [password, setPassword] = useState('123456')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <form className={styles.container} onSubmit={ handleSubmit }>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <button type="submit">Entrar</button>
    </form>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})