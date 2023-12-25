import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

  return(
    <div style={{height:'100vh',display: 'flex',flexDirection: 'column'}}>
        <NavBar title={'Privacy Policy'} onBack={()=>{navigate(-1)}}/>
      <div style={{ flex:1,overflow:'auto',padding: '0 0.8rem',paddingBottom:'3rem'}}>
        <p>Privacy Policy for FunTV<br />
In the course of and for the performance of our service of “FunTV” (the “Service”, the “Company”, “we”, “our” or, “us”) processes various information about our customers who use the Service (“Customer”, “you”, or “your”). FunTV recognizes the importance of the data protection for our Customers and establishes this Privacy Policy for the Service (the “Policy”) to provide you with our data protection policy and your rights concerning your Personal Data (as defined below). Please read this Policy carefully to understand our views and practices regarding your Personal Data and click a button to show your consent to this Policy to agree to our processing of your Personal Data.<br />

1. Information We Collect<br />
We collect information that identifies, relates to, describes, references, and is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular Customer or Customer’s device (“Personal Data”). In particular, we will collect, and have collected in the last twelve (12) months, the following categories of Personal Data:<br />

A. Identifiers<br />

A unique personal identifier, online identifier, internet protocol address, email address, and account name.<br />

B. Commercial information<br />

Records of services purchased, or other purchasing histories (e.g. coin charge history).<br />

C. Internet or other similar network activity information<br />

Browsing history, search history, and any other information on a consumer’s interaction with an application, or advertisement (e.g. Operating System, IDFA (iOS), ADID (Android), favorite, access log (all screens), click or tap log, language code, country code and time zone of the device, app version, device token and browser information (user agent)).<br />

We obtain your Personal Data directly or indirectly from you in our relationship with you, including, but not limited to, when you (i) make your personal account of the Service, (ii) link your social network account with your personal account of the Service, (iii) apply to use the Service, (iv) access or use the Service, and (v) communicate with us for inquiry about the Service.<br />

2. Use of Personal Data<br />
We may use your Personal Data from the list above, for one or more of the following business purposes indicated below:<br />

to provide the Services and enable Customers’ efficient use of the Services;<br />
to process details regarding Customers’ use of the Services;<br />
to process and administer Customers’ personal account and registrations of the Service;<br />
to provide various services correspondence to the Customers (including to notify the Customers of changes to the Services);<br />
to link your social network account with your personal account of the Services;<br />
to process details of Personal Data that the Customers voluntarily provide on the Services;<br />
to perform, monitor and enforce contracts concluded between the Customers and the Company;<br />
to conduct research, analysis, develop our products;<br />
to provide notification of information related to the Service and our other products; and<br />
to serve advertisements to the Customers on our applications based on the use of the Services and/or on third-party sites and applications.<br />
3. Legal Ground for Data Processing<br />
We primarily process your Personal Data based on your consent to this Policy. If you wish to withdraw your consent, you may proceed at any time by informing us of the withdrawal of consent to us through our contact channel that is specified in this Policy. However, the withdrawal of consent will not affect the collection, use, or disclosure of Personal Data you have already given consent to the Company.<br />

Other than where justified by your consent, we will usually process Personal Data where necessary (i) for the performance of contracts executed with you; (ii) for ensuring compliance with our legal obligations; or (iii) for our legitimate interests (or those of a third party), provided your interests and fundamental rights do not override those interests.<br />

We will not intentionally collect Personal Data from a Customer under the age of 16 without obtaining consent from such Customer’s parent or legal guardian in advance. In the event that anyone under the age of 16 wishes to use the Services, we ask them to make sure that the consent is given or authorized by their guardian.<br />

We will not collect additional categories of Personal Data or use the Personal Data we collect for materially different, unrelated, or incompatible purposes without providing you notice thereof.<br />

4. Disclosure of Personal Data<br />
We may disclose your Personal Data to a third party for business purposes or commercial purposes, including but not limited to, with our affiliated companies, third party agents, suppliers, or contractors. When we disclose Personal Data to service providers or contractors for business purposes or commercial purposes, we enter a contract that describes such purposes and requires the service providers to both keep that Personal Data confidential and not use it for any purpose except for performing the contract.<br />

In the preceding twelve (12) months, we have disclosed your Personal Data to the following categories of third parties for business purposes or commercial purposes:

Affiliated companies;<br />
Service providers, including an infrastructure service provider, companies providing maintenance services for system and infrastructure equipment, and a content delivery network provider.<br />
5. International Transfer of Personal Data<br />
In disclosing your Personal Data to a third party, we may transfer your Personal Data to countries outside your country of residence, such as Japan, the Republic of Korea and the United States These countries may not have personal data protection laws as comprehensive as those that exist in your country of residence, and the same level of protection as that set forth in the personal data protection laws in your country may not necessarily be guaranteed. In such case, we shall implement necessary safety management measures pursuant to the requirement pursuant to any and all the applicable laws or legislations in respect with protection of your Personal Data (the “Applicable Law”).<br />

6. Data Storage and Retention Period<br />
Your Personal Data will be stored securely in our data server or in the third-party’s data server. We will strictly control access to this information and will review such access control from time to time. We will not keep your Personal Data for longer than required for the purpose of which it has been processed, in accordance with the Applicable Law or in any case to allow the Company to protect the legitimate rights and interests of its own or of third parties. To determine the appropriate retention period for the Personal Data, we shall consider the amount, nature, and sensitivity of the Personal Data, the potential risk of harm from unauthorized use or disclosure of the Personal Data, the purposes for which we process the Personal Data and whether we can achieve those purposes through other means, and the applicable legal requirements.<br />

7. Your Rights and Choices under the Applicable Law<br />
Pursuant to Applicable Law, you may have several rights on our processing of your Personal Data, which may include, to request access to, correction, or deletion of your Personal Data, restrict processing of your Personal Data, to ask for data portability, and to withdraw your consent to this Policy. You are also entitled to object to the processing of your Personal Data in certain instances.<br />

When we receive a request based on your rights above, we will conduct all necessary investigations without delay and consider whether your request meets the criteria and condition to exercise such rights under the Applicable Law. For exercising your rights specified in this section, you can reach out to us by contacting to the person/department that is provided in the Section 8 (Contact Us).<br />

You also have the right to lodge a complaint with the data protection supervisory authorities if you have any complaint regarding our processing of your Personal Data.<br />

8. Contact Us<br />
If you have any questions or comments about this Policy, the ways in which we collect and use your information described above, or wish to exercise your rights provided in the Section 7 (Your Rights and Choices under the Applicable Law), please do not hesitate to contact us at: admin@funbl.com
</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
