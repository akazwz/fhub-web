import type { NextPage } from 'next'
import { Layout } from '../components/layout'
import { useUser } from '../src/hooks/useUser'
import { LoadingPage } from '../components/loading'

const Home: NextPage = () => {
  const { user, isLoading } = useUser()
  if (isLoading) {
    return <LoadingPage/>
  }
  console.log(user)
  return (
    <Layout>
      Home
    </Layout>
  )
}

export default Home
