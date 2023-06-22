describe('non common configs on open response block and apply undo/redo to changes', () => {
    beforeEach(() => {
    cy.createFlow({
    label: 'Undo/Redo open response configs ',
    })
 })
 it('should configure and test the block', () => {
    const blockConfigs = {
        label: 'your name',
            name: {
                beforeEdit: 'your_name',
                afterEditPostFix: '_updated',
            },
            resources: {
                ivr: ' 02_flowers_for_albert.mp3',
                sms: 'Kindly enter your name',
                ussd: 'Kindly enter your name',
            },
        
        duration: 
        {
           maxDuration:5,
           end_recording:'3'
         },
         tags: [
            {
               name: 'name_tag',
               }
           ]
        
    }
const getStore = () => cy.window().its('store')
const flowModuleState = () => getStore().its('state.flow')
const flowsListState = () => flowModuleState().its('flows')
cy.addBlock(['Content', 'Open Response']).then((openResponseBlockUuid) => {
    const firstBlockState = () => flowsListState().its('[0].blocks[0]')
    const firstResourcesState = () => flowsListState().its('[0].resources[0]')

// ####### Block label & name
cy.get('[data-cy="label--editor"]')
.find('textarea')
.type(blockConfigs.label)
firstBlockState().its('label').should('equal', blockConfigs.label)
firstBlockState().its('name').should('equal', blockConfigs.name.beforeEdit)
cy.get('[data-cy="name-editor--edit-btn"]').click()
cy.get('[data-cy="name-editor--input"]')
.type(blockConfigs.name.afterEditPostFix)
cy.get('[data-cy="name-editor--save-btn"]').click()
firstBlockState().its('name')
.should('equal', `${blockConfigs.name.beforeEdit}${blockConfigs.name.afterEditPostFix}`)

// ####### Resource UIs
cy.get('[data-cy="audio-library-search--btn"]').click()
cy.contains('.dropdown-item', blockConfigs.resources.ivr).click()
cy.get('[data-cy="SMS-resource-variant-text--editor"]')
.find('textarea')
.type(blockConfigs.resources.sms)
cy.get('[data-cy="USSD-resource-variant-text--editor"]')
.find('textarea')
.type(blockConfigs.resources.ussd)
firstResourcesState().its('values').should((values) => {
expect(values).to.have.length(3)

// the order follows how we set the flow modes from createFlow() command
expect(values[0].value).to.equal(blockConfigs.resources.sms)
expect(values[1].value).to.equal(blockConfigs.resources.ussd)
expect(values[2].value).to.contains('.mp3')
})

//##### threshold & validating if the values are saved properly#####

    cy.get('[data-cy="max-duration"]')
    .type(blockConfigs.duration.maxDuration)
    firstBlockState().its('config.ivr.max_duration_seconds').should('equal', 600+blockConfigs.duration.maxDuration)

    cy.get('[data-cy="end_recording"]').as('digitSelector').click()
    .type(blockConfigs.duration.end_recording)
    cy.get('@digitSelector').contains('.multiselect__option', blockConfigs.duration.end_recording).click()
    firstBlockState().its('config.ivr.end_recording_digits').should('eq', blockConfigs.duration.end_recording)


// ###### Tags ######

    firstBlockState().its('tags').should('have.length', 0)
    cy.get('[data-cy="tag--selector"]').as('tagSelector').click()
    cy.get('@tagSelector')
    .find('input')
    .type(blockConfigs.tags[0].name)
    cy.get('@tagSelector').contains('.multiselect__option', blockConfigs.tags[0].name).click()
    firstBlockState().its('tags').should('have.length', 1)
    firstBlockState().its('tags.[0]').should('eq', blockConfigs.tags[0].name)
    cy.save()

    cy.wait(7000)

// Undo all configurations on the block , including removing the block

    for (let i = 0; i < 10; i++) {
         cy.undo();
        } 
// verify that the block has been removed from the builder
    cy.get(`[data-cy="block--${openResponseBlockUuid}"]`).should('not.exist')

    cy.wait(7000)

// Bring back the block including all the configuration
    for (let i = 0; i < 10; i++) {
        cy.redo();
    }

    })

}) 

})