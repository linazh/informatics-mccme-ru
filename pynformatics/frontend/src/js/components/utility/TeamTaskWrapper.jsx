import MainContentWrapper from './MainContentWrapper';

const TeamTaskWrapper = MainContentWrapper.extend`
  padding-top: 86px;
  
  .title_contest {
    width: 222px;
    height: 26px;
    margin-top: 41.5px;
    
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.6px;
    text-align: left;
    color: #393a39;
  }
  
  .title_team {
    width: 222px;
    height: 21px;
    margin-top: 46.5px;
  
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.6px;
    text-align: left;
    color: #2d3446;
  }
  
  .text_block {
    width: 365px; 
    height: 140px;
    margin-top: 28.5px;
    
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #343a40;
  }
  
  .box {
    height: 336px;
  }
  
  @media (max-width: 690px) {
    padding-top: 70px;
    width: 375px;
    height: 100%;
    margin: 0 auto;
    
    .title_contest {
      width: auto;
      height: 24px;
      margin-top: 24px;
        
      font-size: 18px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.6px;
      text-align: left;
      color: #788195;
        
      &:before {
        content: '';
        width: 5px;
        height: 40px;
        margin-top: 17px;
        margin-right: 12px;
        
        background: #e1e6ec;
        display: flex;
      }
       
      &:after {
        content: '';
        width: auto;
        height: 1px;
        margin-right: 19px;
        
        background: #e1e6ec;
        display: flex;
      }
    }
    
    .title_team {
      width: 214px;
      height: 21px;
      margin-top: 27px;
    }
    
    .text_block {
      width: 344px;
      margin-top: 28.5px;
      
      font-size: 13px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.62;
      letter-spacing: normal;
      text-align: left;
      color: #343a40;
    }
  }
    
  }
`;

export default TeamTaskWrapper;