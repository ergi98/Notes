import React from 'react'

export default function debounce(a, b, c) {
    var d, e
    return function() {
        function h() {
            d = null;
            c || ( e = a.apply(f, g))
        }
        var f = this, g = arguments

        return ( 
            clearTimeout(d),
            d = setTimeout(h, b),
            c && !d && ( e = a.apply(f, g) ), e
        )
    }
}

export function removeHTML (str) {
    return str.replace(/<[^>]*>?/gm, '')
}

export function DisplayDate(props) {
    let date = new Date(props.date)
    let today_date = new Date().toLocaleDateString('en-GB')

    // If the note was edited today
    if(date.toLocaleDateString('en-GB') === today_date) {
        let hours = date.getHours()
        let minutes = date.getMinutes()
        return (
            <React.Fragment>
                { hours <= 10? "0"+hours : hours }
                :
                { minutes <= 10? "0"+minutes : minutes }
            </React.Fragment>
               
        )
    }
    else
        return <React.Fragment>{date.toLocaleDateString('en-GB')}</React.Fragment>
}