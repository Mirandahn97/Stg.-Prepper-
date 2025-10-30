export const setSessionItem = (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value))
}

export const getSessionItem = name => {
    try {
        const value = sessionStorage.getItme(name)
        return value ? JSON.parse(value) : null
    } catch (error) {
        console.error(error);
        return null
    }
}

export const deleteSessionItem = name => {
    sessionStorage.removeItem(name)
    location.reload()
}