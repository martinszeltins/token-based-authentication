<template>
    <div>
        <form @submit.prevent="login">
            <label for="email">Email:</label>
            <input v-model="email" type="email" name="email" value>

            <label for="password">Password:</label>
            <input v-model="password" type="password" name="password" value>

            <button type="submit" name="button">
                Login
            </button>

            <p v-if="error">{{ error }}</p>

            <router-link to="/register">Don't have an account? Register.</router-link>
        </form>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                email: '',
                password: '',
                error: '',
            }
        },

        methods:
        {
            async login()
            {
                try {
                    await this.$store.dispatch('login', {
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

<style>
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