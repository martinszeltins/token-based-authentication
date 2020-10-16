<template>
    <div>
        <form @submit.prevent="register">
            <label for="name">Name:</label>
            <input v-model="name" type="text" name="name" value>

            <label for="email">Email:</label>
            <input v-model="email" type="email" name="email" value>

            <label for="password">Password:</label>
            <input v-model="password" type="password" name value>

            <button type="submit" name="button">
                Register
            </button>

            <p v-if="error">{{ error }}</p>

            <router-link to="/login">Already have an account? Login.</router-link>
        </form>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                name: '',
                email: '',
                password: '',
                error: '',
            }
        },

        methods:
        {
            async register()
            {
                try {
                    await this.$store.dispatch('register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                    })
                } catch (error) {
                    this.error = error.response.data.error
                    return
                }
                
                this.$router.push({
                    name: 'dashboard'
                })
            },
        },
    }
</script>

<style scoped>
    input[type="text"],
    input[type="email"],
    input[type="password"] {
        border-radius: 40px;
        border: 1px solid rgb(104, 196, 153);
    }

    input[type="text"]::focus,
    input[type="email"]::focus,
    input[type="password"]::focus {
        outline: 0;
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="password"]:focus {
        outline: 0;
    }

    label {
        margin-bottom: 14px;
    }

    button[type="submit"] {
        padding: 23px 120px;
        margin-top: 30px;
        margin-bottom: 30px;
    }
</style>