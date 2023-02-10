import { useEffect, useState } from "react";
import {
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSpecialCharacter
} from "../../utils";
import "./password-strength-checker.css";

/**
 * 
 * password length between 6 to 32
 *  strength = length + type of characters
 *  max strength = 10
 * 
 * if upper case letter strength+=1
 * if lower case letter strength+=1
 * if digit strength+=1
 * if special character strength+=1
 * 3 < strength <= 6 ==> weak
 * 6 < strength <= 8 ==> moderate
 * 8 < strength ==> strong
 * 
 * length < 3 ===> strength = 0
 * 
 */


export const PasswordStrengthChecker = () => {
    
    const [passwd, setPasswd] = useState("");
    const [strength, setStrength] = useState(0);
    const [progressStyles, setProgressStyles] = useState({
        width: "0%",
        backgroundColor: "transparent"
    });

    const onPasswdChange = (e) => {
        const {
            target: {
                value = ""
            }
        } = e;
        setPasswd(value);
    }

    useEffect(()=>{
        let strength = 0;
        if(passwd.length > 3) {
            let strengthByLength = Math.min(6, Math.floor(passwd.length / 3));
            let strengthByCharType = hasNumber.test(passwd) + hasUpperCase.test(passwd) + hasLowerCase.test(passwd) + hasSpecialCharacter.test(passwd);
            strength = strengthByLength + strengthByCharType;
        } else {
            strength = 0;
        }
        setStrength(strength);

        const width = (strength * 10) + "%";
        let backgroundColor;
        if (strength > 8) {
            backgroundColor = 'green';
        } else if (strength > 5) {
            backgroundColor = 'orange';
        } else {
            backgroundColor = 'red';
        }

        setProgressStyles({
            width,
            backgroundColor
        })

    }, [passwd]);
    
    return <div className="widget-wrapper">
        <input type="password" value={passwd} onChange={onPasswdChange}></input>
        <div className="progress-container">
            <div className="progress-bar" style={{ ...progressStyles }}></div>
        </div>
        <p>Password Strength (out of 10) is {strength}</p>
    </div>
}
