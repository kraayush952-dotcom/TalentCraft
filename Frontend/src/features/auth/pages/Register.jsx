import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Background3D from '../components/Background3D'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await handleRegister({username,email,password})
            navigate("/")
        } catch (err) {
            setError(err)
        }
    }

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main style={{ position: 'relative', overflow: 'hidden' }}>
            <Background3D />
            <h1 
                style={{ position: 'absolute',fontFamily:'sans-serif', top: '1.5rem', left: '2rem', padding: '0.5rem 1rem', color: '#fff', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '700' }}
            >
                Talent<span style={{color:'#ff2d78'}}>Craft</span> 
            </h1>
            <div className="form-container" style={{ position: 'relative', zIndex: 1, background: 'rgba(22, 27, 34, 0.7)', backdropFilter: 'blur(10px)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid rgba(42, 51, 72, 0.5)' }}>
                <h1>Register</h1>
                {error && <p style={{ color: '#ff4d4d', fontSize: '0.875rem', marginBottom: '0.5rem', background: 'rgba(255, 77, 77, 0.1)', padding: '0.5rem', borderRadius: '0.5rem' }}>{error}</p>}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button className='button primary-button' >Register</button>

                </form>

                <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
            </div>
        </main>
    )
}

export default Register